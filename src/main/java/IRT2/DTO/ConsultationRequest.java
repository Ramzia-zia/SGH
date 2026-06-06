package IRT2.DTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationRequest {

    @NotNull(message = "L'ID du docteur est obligatoire")
    private Long docteurId;

    @NotNull(message = "L'ID du dossier patient est obligatoire")
    private Long dossierId;

    @NotBlank(message = "Le diagnostic général est obligatoire")
    private String diagnosticGenerale;

    // L'ordonnance peut être optionnelle selon tes règles métier
    private String ordonnance;

    // Si tu gères tes consultations spécifiques (Ophtalmo, Dermato),
    // tu pourrais ajouter un champ "typeConsultation" ici plus tard.
}