package IRT2.Model;

import IRT2.Enum.Role;
import jakarta.persistence.*;
import lombok.*;

/**
 * La caissière enregistre les paiements et émet les bons.
 * Elle N'A PAS accès aux consultations médicales.
 */
@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Caissiere extends User {

    @Column(length = 100)
    private String poste;

    @Builder(builderMethodName = "caissiereBuilder")
    public Caissiere(String username, String password, String nom, String prenom,
                     String email, String telephone, String poste) {
        setUsername(username);
        setPassword(password);
        setNom(nom);
        setPrenom(prenom);
        setEmail(email);
        setTelephone(telephone);
        setRole(Role.CAISSIERE);
        setActif(true);
        this.poste = poste;
    }
}
