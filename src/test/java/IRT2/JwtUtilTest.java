package IRT2;

import IRT2.Enum.Role;
import IRT2.Model.User;
import IRT2.SecurityConfig.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests unitaires de JwtUtil.
 * Pas de Spring, pas de base de données → ultra rapide.
 *
 * On utilise ReflectionTestUtils pour injecter les @Value manuellement
 * (car @Value est injecté par Spring, pas disponible en test unitaire pur).
 */
class JwtUtilTest {

    private JwtUtil jwtUtil;
    private User    testUser;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        // Injecte les propriétés comme Spring le ferait
        ReflectionTestUtils.setField(jwtUtil, "secretString",
                "SGH2025_CleSecrete_MinimumTrenteDeuxCaracteres!");
        ReflectionTestUtils.setField(jwtUtil, "expiration", 86400000L);
        jwtUtil.init(); // @PostConstruct

        testUser = User.builder()
                .id(1L)
                .username("dr.kofi")
                .password("hashed")
                .nom("Kofi")
                .prenom("Ama")
                .role(Role.DOCTEUR)
                .actif(true)
                .build();
    }

    @Test
    @DisplayName("generateToken → token non null et non vide")
    void generateToken_shouldReturnNonEmptyToken() {
        String token = jwtUtil.generateToken(testUser);
        assertThat(token).isNotNull().isNotBlank();
    }

    @Test
    @DisplayName("extractUsername → retourne le bon username")
    void extractUsername_shouldReturnCorrectUsername() {
        String token    = jwtUtil.generateToken(testUser);
        String username = jwtUtil.extractUsername(token);
        assertThat(username).isEqualTo("dr.kofi");
    }

    @Test
    @DisplayName("validateToken → true pour un token valide")
    void validateToken_shouldReturnTrue_forValidToken() {
        String token = jwtUtil.generateToken(testUser);
        assertThat(jwtUtil.validateToken(token, testUser)).isTrue();
    }

    @Test
    @DisplayName("validateToken → false pour un mauvais username")
    void validateToken_shouldReturnFalse_forWrongUser() {
        User autre = User.builder()
                .username("autre.user")
                .password("x")
                .role(Role.CAISSIERE)
                .actif(true)
                .build();
        String token = jwtUtil.generateToken(testUser);
        assertThat(jwtUtil.validateToken(token, autre)).isFalse();
    }

    @Test
    @DisplayName("token expiré → validateToken retourne false")
    void validateToken_shouldReturnFalse_forExpiredToken() throws Exception {
        // Token qui expire dans 1 milliseconde
        ReflectionTestUtils.setField(jwtUtil, "expiration", 1L);
        jwtUtil.init();
        String token = jwtUtil.generateToken(testUser);
        Thread.sleep(10);  // On attend l'expiration
        assertThat(jwtUtil.validateToken(token, testUser)).isFalse();
    }

    @Test
    @DisplayName("Le rôle est bien inclus dans le token")
    void generateToken_shouldContainRole() {
        String token = jwtUtil.generateToken(testUser);
        String role  = jwtUtil.extractClaim(token,
                claims -> claims.get("role", String.class));
        assertThat(role).isEqualTo("ROLE_DOCTEUR");
    }
}