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
public class RendezVousResponse {

    private Long idRendezVous;
    private LocalDateTime dateRDV;
    private String motif;
    private String statut;

    // Informations utiles du Patient pour l'affichage Front-end
    private Long patientId;
    private String patientNomComplet; // Concaténation de prenom + " " + nom

    // Informations utiles du Docteur
    private Long docteurId;
    private String docteurNomComplet;
    private String docteurSpecialite;
}