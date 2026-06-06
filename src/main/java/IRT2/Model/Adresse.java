package IRT2.Model;
import jakarta.persistence.Embeddable;
import lombok.*;

/**
 * @Embeddable : cette classe n'a pas sa propre table.
 * Ses colonnes sont ajoutées directement dans la table qui l'utilise.
 * Exemple : Patient aura les colonnes rue, ville, code_postal, pays.
 */
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Adresse {

    private String rue;
    private String ville;
    private String codePostal;
    private String Region;
    private String pays;
}
