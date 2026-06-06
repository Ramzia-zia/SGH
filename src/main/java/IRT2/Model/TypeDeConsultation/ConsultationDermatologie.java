package IRT2.Model.TypeDeConsultation;

import IRT2.Model.Consultation;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ConsultationDermatologie extends Consultation {

    /** Zone du corps concernée : "visage", "dos", "membres inférieurs"... */
    private String zoneCorporelle;

    /** Type : "eczéma", "psoriasis", "acné", "mélanome suspect"... */
    private String typeLesion;

    /** Surface atteinte en cm² */
    private Float surfaceTouchee;

    /** Chemin vers la photo (stockée sur serveur ou S3) */
    @Column(length = 500)
    private String photoDermatose;

    @Column(length = 1000)
    private String descriptionLesion;

    /** true si la maladie est chronique */
    @Builder.Default
    private Boolean chronicite = false;

    /** Agent causal identifié : "acarien", "produit chimique"... */
    private String agentCausal;
}
