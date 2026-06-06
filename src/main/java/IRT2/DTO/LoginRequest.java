package IRT2.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Corps JSON attendu pour POST /api/auth/login :
 * {
 *   "username": "dr.kofi",
 *   "password": "motdepasse123"
 * }
 */
@Data
public class LoginRequest {

    @NotBlank(message = "Le nom d'utilisateur est requis")
    private String username;

    @NotBlank(message = "Le mot de passe est requis")
    @Size(min = 6, message = "Minimum 6 caractères")
    private String password;
}