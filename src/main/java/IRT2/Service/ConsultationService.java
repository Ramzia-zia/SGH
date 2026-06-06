package IRT2.Service;

import IRT2.Model.Consultation;
import IRT2.Model.DossierClient;
import IRT2.Repository.ConsultationRepository;
import IRT2.Repository.DossierClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ConsultationService {
    private final ConsultationRepository consultationRepository;
    private final DossierClientRepository dossierRepository;

    // Injection par constructeur (recommandé)
    public ConsultationService(ConsultationRepository consultationRepository,
                               DossierClientRepository dossierRepository) {
        this.consultationRepository = consultationRepository;
        this.dossierRepository = dossierRepository;
    }

    @Transactional
    public Consultation enregistrerConsultation(Consultation consultation) {
        // La consultation nécessite un dossier, un patient et un docteur[cite: 3]
        if (consultation.getDossierClient() == null || consultation.getDocteur() == null) {
            throw new IllegalArgumentException("La consultation doit être liée à un dossier et un docteur.");
        }
        return consultationRepository.save(consultation);
    }

    public List<Consultation> afficherToutesLesConsultations() {
        return consultationRepository.findAll();
    }

    public List<Consultation> listerParDossier(Long dossierId) {
        return consultationRepository.findByDossierClientId(dossierId);
    }
}