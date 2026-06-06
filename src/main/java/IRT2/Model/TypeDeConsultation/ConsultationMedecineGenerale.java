package IRT2.Model.TypeDeConsultation;

import IRT2.Model.Consultation;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ConsultationMedecineGenerale extends Consultation {

    /** Format : "120/80" (systolique/diastolique en mmHg) */
    private String tensionArterielle;

    /** Battements par minute */
    private Integer pouls;

    /** En degrés Celsius */
    private Float temperature;

    /** En kilogrammes */
    private Float poids;

    /** En centimètres */
    private Float taille;

    @Column(length = 1000)
    private String symptomes;

    @Column(length = 1000)
    private String antecedents;

    /** Respirations par minute (norme adulte : 12-20) */
    private Integer frequenceRespiratoire;

    /** Glycémie en g/L */
    private Float glycemie;
}