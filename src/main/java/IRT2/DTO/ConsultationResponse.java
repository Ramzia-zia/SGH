package IRT2.DTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationResponse {

    private Long idConsultation;
    private LocalDateTime dateConsultation;
    private String diagnosticGenerale;
    private String ordonnance;

    // Infos du Docteur ayant réalisé la consultation
    private UUID docteurId;
    private String docteurNomComplet;
    private String docteurSpecialite;

    // Infos liées au Dossier/Patient
    private UUID dossierId;
    private String numeroDossier;
    private String patientNomComplet;
}