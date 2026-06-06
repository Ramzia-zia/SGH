package IRT2.Service;

import IRT2.DTO.LoginRequest;
import IRT2.DTO.RegisterRequest;
import IRT2.DTO.LoginResponse;
import IRT2.Enum.Role;
import IRT2.Model.User;
import IRT2.Repository.UserRepository;
import IRT2.SecurityConfig.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service d'authentification.
 *
 * Login()  : vérifie username/password et retourne un JWT
 * register() : crée un nouvel utilisateur avec le mot de passe haché
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository        userRepository;
    private final PasswordEncoder       passwordEncoder;
    private final JwtUtil               jwtUtil;
    private final AuthenticationManager authenticationManager;

    /**
     * LOGIN
     *
     * Étape 1 : authenticationManager.authenticate()
     *   → appelle CustomUserDetailsService.loadUserByUsername (username)
     *   → compare le password soumis avec le hash BCrypt en BDD
     *   → si invalide : lève BadCredentialsException → 401
     *   → si compte désactivé : lève DisabledException → 401
     *
     * Étape 2 : charge l'utilisateur depuis la BDD
     *
     * Étape 3 : génère le token JWT et le retourne
     */
    @Transactional(readOnly = true)
    public LoginResponse login(@Valid LoginRequest request) {
        log.info("Tentative de connexion : {}", request.getUsername());

        // Spring Security fait tout le travail ici (BCrypt, actif...)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        String token = jwtUtil.generateToken(user);
        log.info("Connexion réussie : {} ({})", user.getUsername(), user.getRole());

        return new LoginResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getNom(),
                user.getPrenom(),
                user.getRole()
        );
    }

    /**
     * CRÉER UN UTILISATEUR
     *
     * Appelé par l'admin pour créer docteurs, secrétaires, etc.
     * Le mot de passe est HACHÉ avec BCrypt avant d'être sauvegardé.
     *
     * passwordEncoder. Encode("motdepasse123")
     *   → "$2a$12$xK9zL3pQrS5tUv7wXy9z..."  (jamais stocké en clair)
     */
    @Transactional
    public User register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalStateException(
                    "Le nom d'utilisateur '" + request.getUsername() + "' est déjà pris."
            );
        }
        if (request.getEmail() != null && userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException(
                    "L'email '" + request.getEmail() + "' est déjà utilisé."
            );
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))  // ← HACHAGE ICI
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .telephone(request.getTelephone())
                .role(request.getRole())
                .actif(true)
                .build();

        User saved = userRepository.save(user);
        log.info("Utilisateur créé : {} ({})", saved.getUsername(), saved.getRole());
        return saved;
    }

    /** Active ou désactive un compte */
    @Transactional
    public void toggleActif(Long userId, boolean actif) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur #" + userId + " introuvable"));
        user.setActif(actif);
        userRepository.save(user);
        log.info("Compte {} {}", user.getUsername(), actif ? "activé" : "désactivé");
    }

    /** Initialise le premier admin (route publique, appel unique) */
    @Transactional
    public User initPremierAdmin(@Valid RegisterRequest request) {
        if (!userRepository.findByRole(Role.ADMIN).isEmpty()) {
            throw new IllegalStateException("Un administrateur existe déjà.");
        }
        request.setRole(Role.ADMIN);
        return register(request);
    }
}
