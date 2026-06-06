package IRT2.Controller;

import IRT2.Model.Consultation;
import IRT2.Repository.ConsultationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@RequiredArgsConstructor
public class ConsultationController {

    private final ConsultationRepository consultationRepository;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTEUR')")
    public Consultation creerConsultation(@RequestBody Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTEUR', 'SECRETAIRE')")
    public List<Consultation> listerConsultations() {
        return consultationRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTEUR', 'SECRETAIRE')")
    public ResponseEntity<Consultation> obtenirConsultation(@PathVariable Long id) {
        return consultationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTEUR')")
    public Consultation modifierConsultation(@PathVariable Long id, @RequestBody Consultation consDetails) {
        return consultationRepository.findById(id).map(cons -> {
            cons.setDiagnostic(consDetails.getDiagnostic());
            cons.setTraitement(consDetails.getTraitement());
            return consultationRepository.save(cons);
        }).orElseThrow(() -> new RuntimeException("Consultation non trouvée"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void supprimerConsultation(@PathVariable Long id) {
        consultationRepository.deleteById(id);
    }
}