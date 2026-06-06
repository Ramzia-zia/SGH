package IRT2.Model;

import IRT2.Enum.Role;
import jakarta.persistence.*;
import lombok.*;

/**
 * La secrétaire gère les rendez-vous et valide les bons.
 * Elle peut être associée à un service ou un médecin.
 */
@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Secretaire extends User {

    @Column(length = 100)
    private String bureau;

    /** Service auquel la secrétaire est rattachée (ex : "Ophtalmologie") */
    @Column(length = 100)
    private String service;

    @Builder(builderMethodName = "secretaireBuilder")
    public Secretaire(String username, String password, String nom, String prenom,
                      String email, String telephone, String bureau, String service) {
        setUsername(username);
        setPassword(password);
        setNom(nom);
        setPrenom(prenom);
        setEmail(email);
        setTelephone(telephone);
        setRole(Role.SECRETAIRE);
        setActif(true);
        this.bureau  = bureau;
        this.service = service;
    }
}
