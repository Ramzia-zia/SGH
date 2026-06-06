package IRT2.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Dossier médical du patient.
 * Créé automatiquement à l'inscription du patient.
 * Contient les antécédents et est lié à toutes ses consultations.
 */
@Entity
@Table(name = "dossiers_clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"patient", "consultations"})
public class DossierClient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numeroDossier;

    /**
     * Relation inverse : DossierClient connaît son patient.
     * @JoinColumn crée la colonne "patient_id" dans la table "dossiers_clients".
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false, unique = true)
    private Patient patient;

    @Column(updatable = false)
    private LocalDateTime dateCreation;

    @Column(length = 2000)
    private String antecedentsFamiliaux;

    @Column(length = 2000)
    private String antecedentsPersonnels;

    @Column(length = 2000)
    private String allergies;

    @Column(length = 1000)
    private String remarques;

    /** Toutes les consultations de ce patient, tous types confondus */
    @OneToMany(mappedBy = "dossierClient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Consultation> consultations = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
    }
}