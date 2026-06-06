package IRT2.Repository;

import IRT2.Enum.Role;
import IRT2.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * JpaRepository<User, Long> nous donne gratuitement :
 * save(), findById(), findAll(), delete(), count()...
 *
 * Spring génère le SQL automatiquement à partir du nom des méthodes.
 * findByUsername("dr.kofi") → SELECT * FROM users WHERE username = 'dr.kofi'
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Utilisée par CustomUserDetailsService lors du login.
     * Retourne Optional pour éviter les NullPointerException.
     */
    Optional<User> findByUsername(String username);

    /** Vérifie si un username est déjà pris avant création */
    boolean existsByUsername(String username);

    /** Vérifie si un email est déjà utilisé avant création */
    boolean existsByEmail(String email);

    /** Liste tous les utilisateurs d'un rôle donné */
    List<User> findByRole(Role role);
}