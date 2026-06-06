package IRT2.Controller;

import IRT2.Model.Consultation;
import IRT2.Model.DossierClient;
import IRT2.Service.ConsultationService;
import IRT2.Service.DossierClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dossiers")
public class DossierMedecinController {
    private final DossierClientService dossierService;
    private final ConsultationService consultationService;

    public DossierMedecinController(DossierClientService dossierService, ConsultationService consultationService) {
        this.dossierService = dossierService;
        this.consultationService = consultationService;
    }

    // Voir le dossier complet d'un patient via son ID
    @GetMapping("/patient/{idPatient}")
    public ResponseEntity<DossierClient> getDossierPatient(@PathVariable Long idPatient) {
        return ResponseEntity.ok(dossierService.obtenirDossierParPatient(idPatient));
    }

    // Ajouter une consultation
    @PostMapping("/patient/{idPatient}/consultations")
    public ResponseEntity<Consultation> creerConsultation(@PathVariable Long idPatient, @RequestBody Consultation consultation) {
        return null;
        //ResponseEntity.ok(consultationService.ajouterConsultation(idPatient, consultation));
    }
}