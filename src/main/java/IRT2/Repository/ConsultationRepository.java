package IRT2.Repository;

import IRT2.Model.Consultation;
import IRT2.Model.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByPatientIdOrderByDateConsultationDesc(Long patientId);
    List<Consultation> findByDocteurId(Long docteurId);
    List<Consultation> findByDossierClientId(Long dossierId);
}