package IRT2.DTO;


import IRT2.Enum.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * Corps JSON pour créer un utilisateur (admin, docteur, etc.) :
 * {
 *   "username":  "dr.kofi",
 *   "password":  "MotDePasse123!",
 *   "nom":       "Kofi",
 *   "prenom":    "Ama",
 *   "email":     "dr.kofi@clinique.tg",
 *   "telephone": "+22890000000",
 *   "role":      "DOCTEUR"
 * }
 */
@Data
public class RegisterRequest {

    @NotBlank(message = "Username requis")
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank(message = "Mot de passe requis")
    @Size(min = 6, message = "Minimum 6 caractères")
    private String password;

    @NotBlank(message = "Nom requis")
    private String nom;

    @NotBlank(message = "Prénom requis")
    private String prenom;

    @Email(message = "Email invalide")
    private String email;

    private String telephone;

    @NotNull(message = "Le rôle est requis")
    private Role role;
}