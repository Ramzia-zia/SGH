package IRT2.Service;

import IRT2.Model.DossierClient;
import IRT2.Model.Patient;
import IRT2.Repository.DossierClientRepository;
import org.springframework.stereotype.Service;
import IRT2.Model.RendezVous;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DossierClientService {

    private final DossierClientRepository dossierRepository;

    public DossierClientService(DossierClientRepository dossierRepository) {
        this.dossierRepository = dossierRepository;
    }

    @Transactional
    public DossierClient creerDossierPourPatient(Patient patient) {
        DossierClient dossier = new DossierClient();
        // Génération d'un numéro de dossier unique basé sur le timestamp
        dossier.setNumeroDossier("DOS-" + System.currentTimeMillis());
        dossier.setPatient(patient);
        dossier.setAntecedentsPersonnels("Aucun antécédent enregistré.");
        return dossierRepository.save(dossier);
    }

    public DossierClient obtenirDossierParPatient(Long idPatient) {
        return dossierRepository.findByPatientId(idPatient)
                .orElseThrow(() -> new RuntimeException("Dossier client introuvable pour ce patient."));
    }

    @Transactional
    public DossierClient majAntecedents(Long idDossier, String nouveauxAntecedents) {
        DossierClient dossier = dossierRepository.findById(idDossier)
                .orElseThrow(() -> new RuntimeException("Dossier introuvable."));
        dossier.setAntecedentsPersonnels(nouveauxAntecedents);
        return dossierRepository.save(dossier);
    }

}
