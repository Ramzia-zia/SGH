package IRT2.DTO;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class RendezVousRequest {

    @NotNull(message = "L'ID du patient est obligatoire")
    private Long patientId;

    @NotNull(message = "L'ID du docteur est obligatoire")
    private Long docteurId;

    @NotNull(message = "La date du rendez-vous est obligatoire")
    @FutureOrPresent(message = "La date du rendez-vous doit être dans le futur ou le présent")
    private LocalDateTime dateRDV;

    @NotBlank(message = "Le motif du rendez-vous est obligatoire")
    @Size(max = 255, message = "Le motif ne doit pas dépasser 255 caractères")
    private String motif;

    // Optionnel lors de la création (le service le mettra par défaut à EN_ATTENTE)
    // Mais utile lors d'un PUT (modification) pour changer le statut à VALIDE, ANNULE ou TERMINE.
    private String statut;
}