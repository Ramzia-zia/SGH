package IRT2.Model;

import IRT2.Enum.Role;
import IRT2.Enum.Sexe;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Le patient est aussi un utilisateur (peut se connecter au portail patient).
 * Il possède un DossierClient unique et peut avoir plusieurs rendez-vous.
 *
 * Note : un patient est créé par la CAISSIERE lors de l'inscription.
 * Son username est généralement son numéro de dossier ou prénom.nom.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, exclude = {"dossierClient", "rendezVous"})
public class Patient extends User {

    @Column(nullable = false)
    private LocalDate dateNaissance;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Sexe sexe;

    /** A, B, AB, O — suivi du signe +/- */
    @Column(length = 5)
    private String groupeSanguin;

    @Column(length = 1000)
    private String allergiesConnues;

    /** Prénom et nom de la personne à prévenir en cas d'urgence */
    @Column(length = 200)
    private String personneAContacter;

    @Column(length = 20)
    private String contactUrgence;

    /** Adresse embarquée — colonnes ajoutées directement dans la table "patients" */
    @Embedded
    private Adresse adresse;

    /**
     * Un patient a UN seul dossier médical.
     * mappedBy = "patient" → c'est DossierClient qui porte la FK.
     * orphanRemoval = true → si on supprime le patient, le dossier est supprimé aussi.
     */
    @OneToOne(mappedBy = "patient", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    private DossierClient dossierClient;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RendezVous> rendezVous = new ArrayList<>();

    @Builder(builderMethodName = "patientBuilder")
    public Patient(String username, String password, String nom, String prenom,
                   String email, String telephone, LocalDate dateNaissance,
                   Sexe sexe, String groupeSanguin, String allergiesConnues,
                   String personneAContacter, String contactUrgence, Adresse adresse) {
        setUsername(username);
        setPassword(password);
        setNom(nom);
        setPrenom(prenom);
        setEmail(email);
        setTelephone(telephone);
        setRole(Role.PATIENT);
        setActif(true);
        this.dateNaissance      = dateNaissance;
        this.sexe               = sexe;
        this.groupeSanguin      = groupeSanguin;
        this.allergiesConnues   = allergiesConnues;
        this.personneAContacter = personneAContacter;
        this.contactUrgence     = contactUrgence;
        this.adresse            = adresse;
    }
}
