package IRT2.Model;

import IRT2.Enum.TypeConsultation;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Classe mère de toutes les consultations.
 * Stratégie JOINED : chaque sous-classe a sa propre table,
 * liée à cette table via consultation_id.
 * Table "consultations" contient les colonnes communes.
 * Table "consultation_ophtalmologie" contient les colonnes spécifiques
 * à l'ophtalmologie, liée par une FK sur consultations.id.
 * Avantage vs SINGLE_TABLE : pas de colonnes NULL pour chaque spécialité.
 * Avantage vs TABLE_PER_CLASS : les requêtes globales restent simples.
 */
@Entity
@Table(name = "consultations")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"dossierClient", "patient", "docteur"})
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dateConsultation;

    @Column(length = 500)
    private String motif;

    @Column(length = 2000)
    private String diagnostic;

    @Column(length = 2000)
    private String traitement;

    @Column(length = 2000)
    private String observations;

    /**
     * Le type permet de savoir quelle sous-classe charger
     * et donc dans quelle table fille chercher les données.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TypeConsultation typeConsultation;

    /**
     * Lien direct vers le dossier — pour accéder rapidement
     * à toutes les consultations d'un patient depuis son dossier.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dossier_client_id", nullable = false)
    private DossierClient dossierClient;

    /** Redondant avec dossierClient. Patient, mais pratique pour les requêtes directes */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "docteur_id", nullable = false)
    private Docteur docteur;

    @PrePersist
    protected void onCreate() {
        if (dateConsultation == null) {
            dateConsultation = LocalDateTime.now();
        }
    }
}
