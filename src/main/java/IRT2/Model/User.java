package IRT2.Model;

import IRT2.Enum.Role;
import IRT2.Model.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

/**
 * Entité User — table "users" dans MySQL.
 *
 * Implémente UserDetails :
 *   Spring Security appelle getUsername() et getPassword()
 *   pour comparer avec ce que l'utilisateur envoie.
 *   On n'a pas besoin d'écrire cette logique nous-mêmes.
 *
 * Le mot de passe est TOUJOURS stocké haché (BCrypt).
 * On ne stocke JAMAIS "motdepasse123" en clair.
 * BCrypt stocke quelque chose comme :
 *   $2a$12$xK9zL3p...  (toujours 60 caractères)
 */
@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Login de connexion. Exemples : "dr.kofi", "sec.amina", "admin"
     * Unique dans toute la table, obligatoire.
     */
    @NotBlank
    @Size(min = 3, max = 50)
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    /**
     * MOT DE PASSE HACHÉ par BCrypt.
     * On encode AVANT de sauvegarder (dans le Service).
     * Spring Security compare automatiquement via BCryptPasswordEncoder.
     */
    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 100)
    private String nom;

    @Column(nullable = false, length = 100)
    private String prenom;

    @Column(unique = true, length = 150)
    private String email;

    @Column(length = 20)
    private String telephone;

    /**
     * Rôle stocké en String dans MySQL (ex: "DOCTEUR").
     * EnumType.STRING est préférable à ORDINAL car si on
     * réordonne l'enum, les données ne sont pas corrompues.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;

    /**
     * L'admin peut désactiver un compte sans le supprimer.
     * isEnabled() retourne cette valeur → Spring Security
     * refusera la connexion si false.
     */
    @Builder.Default
    @Column(nullable = false)
    private boolean actif = true;

    @Column(updatable = false)
    private LocalDateTime dateCreation;

    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
    }

    // ─────────────────────────────────────────────────────────────
    // Méthodes UserDetails — Spring Security les appelle
    // automatiquement. On n'a pas à les appeler manuellement.
    // ─────────────────────────────────────────────────────────────

    /**
     * Retourne les rôles de cet utilisateur.
     * Spring Security lit cette liste pour les contrôles d'accès.
     * "ROLE_" + role.name() → "ROLE_DOCTEUR", "ROLE_ADMIN", etc.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
                new SimpleGrantedAuthority("ROLE_" + role.name())
        );
    }

    @Override public String getPassword()              { return password; }
    @Override public String getUsername()              { return username; }
    @Override public boolean isAccountNonExpired()     { return true; }
    @Override public boolean isAccountNonLocked()      { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }

    /** Si actif = false → Spring Security rejette la connexion avec DisabledException */
    @Override public boolean isEnabled()               { return actif; }
}