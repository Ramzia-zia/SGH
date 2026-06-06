package IRT2.SecurityConfig;
import IRT2.SecurityConfig.JwtAuthFilter;
import IRT2.SecurityConfig.JwtUtil;
import IRT2.Service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Configuration centrale de la sécurité.
 *
 * ┌──────────────┬─────────────────────────────────────────────────────────┐
 * │ Rôle         │ Pages / routes accessibles                              │
 * ├──────────────┼─────────────────────────────────────────────────────────┤
 * │ ADMIN        │ Tout                                                    │
 * │ DOCTEUR      │ /api/docteurs, /api/consultations, /api/patients (GET) │
 * │ SECRETAIRE   │ /api/rendez-vous, /api/patients, /api/docteurs (GET)   │
 * │ CAISSIERE    │ /api/patients (inscription), /api/paiements             │
 * │ PATIENT      │ /api/mon-dossier (son propre dossier uniquement)        │
 * └──────────────┴─────────────────────────────────────────────────────────┘
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity          // Active @PreAuthorize sur les méthodes des controllers
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter            jwtAuthFilter;
    private final CustomUserDetailsService userDetailsService;

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    /**
     * BCryptPasswordEncoder avec force 12.
     *
     * BCrypt est un algorithme de hachage LENT intentionnellement.
     * Force 12 = 2^12 = 4096 itérations de hachage.
     * Rend les attaques par force brute très coûteuses.
     *
     * Exemple :
     *   "motdepasse123" → "$2a$12$xK9zL3pQ..."  (60 caractères, toujours différent)
     *   "motdepasse123" → "$2a$12$yR7mW4qT..."  (même input, hash différent → salt aléatoire)
     *
     * BCrypt vérifie les deux hashes comme identiques malgré la différence visuelle.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    /**
     * DaoAuthenticationProvider :
     * 1. Appelle userDetailsService.loadUserByUsername(username)
     * 2. Compare le password soumis avec le hash BCrypt stocké
     * 3. Vérifie isEnabled() → compte actif ?
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        //provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /**
     * Point d'entrée pour déclencher l'authentification dans le Service.
     * authenticationManager.authenticate (token) → lance toute la chaîne ci-dessus.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Chaîne de filtres de sécurité — le cœur de la configuration.
     *
     * Les règles RequestMatcher sont évaluées dans l'ORDRE.
     * La première règle qui correspond est appliquée.
     * → Mettez les règles les plus spécifiques EN PREMIER.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF désactivé : on utilise JWT stateless, pas de session cookie
                .csrf(AbstractHttpConfigurer::disable)

                // CORS : autorise React à appeler l'API
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // STATELESS : pas de session HTTP côté serveur
                // Chaque requête doit porter son token JWT
                .sessionManagement(s ->
                        s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // ────────────────────────────────────────────────────────
                // RÈGLES D'ACCÈS PAR ROUTE
                // ────────────────────────────────────────────────────────
                .authorizeHttpRequests(auth -> auth

                        // ── Routes publiques ─────────────────────────────────
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/premier-admin").permitAll()

                        // ── Admin : accès total ──────────────────────────────
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/auth/register").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH,  "/api/auth/users/**").hasRole("ADMIN")

                        // ── Docteur ──────────────────────────────────────────
                        // Peut voir sa liste de docteurs, ses consultations, ses patients
                        .requestMatchers("/api/docteurs/**")
                        .hasAnyRole("ADMIN", "DOCTEUR", "SECRETAIRE", "CAISSIERE")
                        .requestMatchers(HttpMethod.POST, "/api/consultations/**")
                        .hasAnyRole("ADMIN", "DOCTEUR")
                        .requestMatchers(HttpMethod.PUT,  "/api/consultations/**")
                        .hasAnyRole("ADMIN", "DOCTEUR")
                        .requestMatchers(HttpMethod.GET,  "/api/consultations/**")
                        .hasAnyRole("ADMIN", "DOCTEUR", "SECRETAIRE")

                        // ── Secrétaire ───────────────────────────────────────
                        // Gère les rendez-vous et peut lire/créer les patients
                        .requestMatchers(HttpMethod.POST, "/api/rendez-vous/**")
                        .hasAnyRole("ADMIN", "SECRETAIRE")
                        .requestMatchers(HttpMethod.PUT,  "/api/rendez-vous/**")
                        .hasAnyRole("ADMIN", "SECRETAIRE", "DOCTEUR")
                        .requestMatchers(HttpMethod.GET,  "/api/rendez-vous/**")
                        .hasAnyRole("ADMIN", "SECRETAIRE", "DOCTEUR")

                        // ── Caissière ────────────────────────────────────────
                        // Inscrit les patients et gère les paiements
                        .requestMatchers(HttpMethod.POST, "/api/patients/**")
                        .hasAnyRole("ADMIN", "CAISSIERE", "SECRETAIRE")
                        .requestMatchers(HttpMethod.GET,  "/api/patients/**")
                        .hasAnyRole("ADMIN", "CAISSIERE", "SECRETAIRE", "DOCTEUR")
                        .requestMatchers(HttpMethod.PUT,  "/api/patients/**")
                        .hasAnyRole("ADMIN", "CAISSIERE", "SECRETAIRE")
                        .requestMatchers("/api/paiements/**")
                        .hasAnyRole("ADMIN", "CAISSIERE")

                        // ── Patient ──────────────────────────────────────────
                        // Accède uniquement à son propre dossier
                        .requestMatchers("/api/mon-dossier/**")
                        .hasAnyRole("ADMIN", "PATIENT")

                        // ── Tout le reste nécessite d'être connecté ──────────
                        .anyRequest().authenticated()
                )

                .authenticationProvider(authenticationProvider())

                // Notre filtre JWT s'exécute AVANT le filtre d'auth standard de Spring
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * CORS : permet à React (localhost:3000 / 5173) d'appeler l'API.
     * Sans cette config, le navigateur bloque les requêtes cross-origin.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        List<String> origins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .toList();
        config.setAllowedOrigins(origins);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}