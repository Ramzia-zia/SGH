package IRT2.Controller;

import IRT2.Model.RendezVous;
import IRT2.Repository.RendezVousRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/rendez-vous")
@RequiredArgsConstructor
public class RendezVousController {

    private final RendezVousRepository rendezVousRepository;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETAIRE')")
    public RendezVous creerRendezVous(@RequestBody RendezVous rendezVous) {
        return rendezVousRepository.save(rendezVous);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETAIRE', 'DOCTEUR')")
    public List<RendezVous> listerRendezVous() {
        return rendezVousRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETAIRE', 'DOCTEUR')")
    public ResponseEntity<RendezVous> obtenirRendezVous(@PathVariable Long id) {
        return rendezVousRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SECRETAIRE', 'DOCTEUR')")
    public RendezVous modifierRendezVous(@PathVariable Long id, @RequestBody RendezVous rdvDetails) {
        return rendezVousRepository.findById(id).map(rdv -> {
            rdv.setMotif(rdvDetails.getMotif());
            rdv.setStatut(rdvDetails.getStatut());
            return rendezVousRepository.save(rdv);
        }).orElseThrow(() -> new RuntimeException("RDV non trouvé"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void supprimerRendezVous(@PathVariable Long id) {
        rendezVousRepository.deleteById(id);
    }
}