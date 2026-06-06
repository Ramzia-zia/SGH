package IRT2.Controller;

import IRT2.Model.DossierClient;
import IRT2.Model.Patient;
import IRT2.Repository.PatientRepository;
import IRT2.Service.DossierClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secretaire")
public class SecretaireController {

    private final PatientRepository patientRepository;
    private final DossierClientService dossierService;

    public SecretaireController(PatientRepository patientRepository, DossierClientService dossierService) {
        this.patientRepository = patientRepository;
        this.dossierService = dossierService;
    }

    // La secrétaire enregistre un patient et lui génère automatiquement son dossier de suivi
    @PostMapping("/patient/enregistrer")
    public ResponseEntity<?> enregistrerPatientEtDossier(@RequestBody Patient patient) {
        Patient nouveauPatient = patientRepository.save(patient);
        DossierClient dossier = dossierService.creerDossierPourPatient(nouveauPatient);
        return ResponseEntity.status(HttpStatus.CREATED).body(dossier);
    }

}
