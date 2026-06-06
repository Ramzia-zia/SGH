package IRT2.SecurityConfig;

import IRT2.Service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtre JWT exécuté UNE SEULE FOIS par requête (OncePerRequestFilter).
 *
 * Ce que fait ce filtre à chaque requête entrante :
 *
 *  ┌─────────────────────────────────────────────────────────┐
 *  │  Requête HTTP arrive                                    │
 *  │  ↓                                                      │
 *  │  Y a-t-il "Authorization : Bearer xxx" dans les headers ? │
 *  │  NON → on passe (Spring Security gère l'erreur)         │
 *  │  OUI → on extrait le token                              │
 *  │  ↓                                                      │
 *  │  On extrait l'username depuis le token                 │
 *  │  ↓                                                      │
 *  │  On charge l'utilisateur depuis la BDD                  │
 *  │  ↓                                                      │
 *  │  Le token est-il valide et non expiré ?                 │
 *  │  OUI → on injecte l'auth dans le SecurityContext        │
 *  │  NON → on passe (Spring Security renvoie 401)           │
 *  └─────────────────────────────────────────────────────────┘
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest  request,
                                    HttpServletResponse response,
                                    FilterChain         filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // Pas d'en-tête Authorization ou ne commence pas par "Bearer " → on passe
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // On enlève le préfixe "Bearer " pour avoir juste le token
        final String jwt = authHeader.substring(7);

        try {
            final String username = jwtUtil.extractUsername(jwt);

            // On ne retraite pas si l'utilisateur est déjà authentifié pour cette requête
            if (username != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {

                // Charge l'utilisateur depuis la BDD (avec ses rôles à jour)
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(jwt, userDetails)) {
                    // Crée l'objet d'authentification Spring Security
                    var authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,                          // credentials null (plus besoin du mot de passe)
                            userDetails.getAuthorities()   // ["ROLE_DOCTEUR"]
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    // ← Injection dans le SecurityContext
                    // À partir de là, Spring Security sait QUI fait la requête
                    // et peut vérifier les @PreAuthorize et les RequestMatchers
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    log.debug("Authentifié via JWT : {} [{}]",
                            username, userDetails.getAuthorities());
                }
            }
        } catch (Exception e) {
            // On ne bloque pas la requête ici.
            // Spring Security s'en charge : les routes protégées renverront 401.
            log.warn("Échec validation JWT [{}] : {}", request.getRequestURI(), e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}