package IRT2.Service;

import IRT2.Model.RendezVous;
import IRT2.Repository.RendezVousRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RendezVousService {

    private final RendezVousRepository rdvRepository;

    // Suppression de @Autowired, le constructeur suffit pour l'injection[cite: 9]
    public RendezVousService(RendezVousRepository rdvRepository) {
        this.rdvRepository = rdvRepository;
    }

    @Transactional
    public RendezVous enregistrerRendezVous(RendezVous rdv) {
        // Vérification de la cohérence requise par le modèle[cite: 4]
        if (rdv.getPatient() == null || rdv.getDocteur() == null) {
            throw new IllegalArgumentException("Le rendez-vous doit avoir un patient et un médecin.");
        }
        return rdvRepository.save(rdv);
    }

    public List<RendezVous> listerParMedecin(Long docteurId) {
        return rdvRepository.findByDocteurId(docteurId);
    }

    public List<RendezVous> listerParPatient(Long patientId) {
        return rdvRepository.findByPatientId(patientId);
    }
}