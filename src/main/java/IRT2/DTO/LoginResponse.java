package IRT2.DTO;

import IRT2.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Réponse JSON renvoyée après un login réussi :
 * {
 *   "token":    "eyJhbGci...",
 *   "tokenType": "Bearer",
 *   "userId":   1,
 *   "username": "dr.kofi",
 *   "nom":      "Kofi",
 *   "prenom":   "Ama",
 *   "role":     "DOCTEUR"
 * }
 *
 * React stocke ce token (ex: localStorage) et l'envoie
 * dans chaque requête suivante :
 *   Authorization: Bearer eyJhbGci...
 */
@Data
@AllArgsConstructor
public class LoginResponse {

    private String token;
    private String tokenType = "Bearer";
    private Long   userId;
    private String username;
    private String nom;
    private String prenom;
    private Role   role;

    public LoginResponse(String token, Long userId, String username,
                         String nom, String prenom, Role role) {
        this.token    = token;
        this.userId   = userId;
        this.username = username;
        this.nom      = nom;
        this.prenom   = prenom;
        this.role     = role;
    }
}