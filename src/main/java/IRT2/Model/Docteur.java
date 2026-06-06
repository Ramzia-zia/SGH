package IRT2.Model;

import IRT2.Enum.Role;
import IRT2.Enum.Specialite;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

/**
 * Table "docteurs" avec seulement les colonnes propres aux docteurs.
 * La jointure avec "users" se fait via la colonne user_id (PK partagée).
 *
 * @PrimaryKeyJoinColumn : indique à JPA que la PK de "docteurs" est
 * aussi une FK vers "users.id" → pas de colonne id séparée dans la table.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, exclude = {"rendezVous", "consultations"})
public class Docteur extends User {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Specialite specialite;

    /** Numéro d'ordre professionnel (ex: ordre des médecins) */
    @Column(length = 50)
    private String numeroOrdre;

    /** Bureau ou salle de consultation */
    @Column(length = 100)
    private String bureau;

    /**
     * Un docteur peut avoir plusieurs rendez-vous.
     * mappedBy = "docteur" signifie que c'est la colonne "docteur_id"
     * dans la table rendez_vous qui gère la relation.
     * CascadeType.ALL : si on supprime le docteur, ses RDV sont supprimés.
     * FetchType.LAZY : les RDV ne sont chargés que si on les demande
     * explicitement → performance.
     */
    @OneToMany(mappedBy = "docteur", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RendezVous> rendezVous = new ArrayList<>();

    @OneToMany(mappedBy = "docteur", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Consultation> consultations = new ArrayList<>();

    /** Constructeur pratique pour créer un Docteur complet */
    @Builder(builderMethodName = "docteurBuilder")
    public Docteur(String username, String password, String nom, String prenom,
                   String email, String telephone,
                   Specialite specialite, String numeroOrdre, String bureau) {
        setUsername(username);
        setPassword(password);
        setNom(nom);
        setPrenom(prenom);
        setEmail(email);
        setTelephone(telephone);
        setRole(Role.DOCTEUR);
        setActif(true);
        this.specialite  = specialite;
        this.numeroOrdre = numeroOrdre;
        this.bureau      = bureau;
    }
}