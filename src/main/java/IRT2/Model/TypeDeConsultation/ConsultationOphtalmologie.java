package IRT2.Model.TypeDeConsultation;

import IRT2.Model.Consultation;
import jakarta.persistence.*;
import lombok.*;

/**
 * Consultation spécifique à l'ophtalmologie.
 * Sa table "consultation_ophtalmologie" a seulement les colonnes spécifiques.
 * JPA fait automatiquement un JOIN avec "consultations" quand on charge cet objet.
 *
 * OD = Œil Droit, OG = Œil Gauche
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ConsultationOphtalmologie extends Consultation {

    /** Acuité visuelle (sur 10 ou 20/20) */
    private Float acuiteVisuelleOD;
    private Float acuiteVisuelleOG;

    /** Pression oculaire en mmHg (norme : 10-21 mmHg) */
    private Float pressionOculaireOD;
    private Float pressionOculaireOG;

    /** Résultat de l'examen du fond d'œil */
    @Column(length = 1000)
    private String fondOeil;

    /** Type de correction : "lunettes", "lentilles", "aucune" */
    private String typeVerres;

    /** Correction en dioptries (+3.5, -2.25...) */
    private Float correctionOD;
    private Float correctionOG;

    @Column(length = 500)
    private String remarques;
}