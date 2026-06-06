package IRT2.Controller;

import IRT2.Model.RendezVous;
import IRT2.Repository.RendezVousRepository;
import IRT2.Service.RendezVousService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("docteur")
public class DocteurController {

    private final RendezVousService rdvService;

    public DocteurController(RendezVousService rdvService) {
        this.rdvService = rdvService;
    }

    // Accessible uniquement par un utilisateur possédant le ROLE_DOCTEUR
    @GetMapping("/rendezvous/{docteurId}")
    public ResponseEntity<List<RendezVous>> getMesRendezVous(@PathVariable Long docteurId) {
        return ResponseEntity.ok(rdvService.listerParMedecin(docteurId));
    }

}
