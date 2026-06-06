package IRT2.Model;

import IRT2.Enum.Role;
import IRT2.Enum.StatusRendezVous;
import IRT2.Enum.TypeConsultation;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Représente un rendez-vous entre un patient et un médecin.
 *
 * Cycle de vie :
 * 1. La CAISSIERE inscrit le patient et le SECRETAIRE crée le RDV (EN_ATTENTE)
 * 2. La SECRETAIRE valide et confirme le créneau (CONFIRME)
 * 3. Le médecin reçoit le patient (TERMINE) → une Consultation est créée
 * 4. En cas d'absence ou d'annulation (ANNULE)
 */
@Entity
@Table(name = "rendez_vous")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"patient", "docteur"})
public class RendezVous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "docteur_id", nullable = false)
    private Docteur docteur;

    @Column(nullable = false)
    private LocalDateTime dateEcheance;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private StatusRendezVous statut = StatusRendezVous.EN_ATTENTE;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private TypeConsultation typeConsultation;

    @Column(length = 500)
    private String motif;

    @Column(length = 500)
    private String notes;

    @Column(updatable = false)
    private LocalDateTime dateCreation;

    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
    }
}
