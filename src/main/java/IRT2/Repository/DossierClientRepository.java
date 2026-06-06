package IRT2.Repository;

import IRT2.Model.DossierClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DossierClientRepository extends JpaRepository<DossierClient, Long> {
    Optional<DossierClient> findByPatientId(Long patientId);
    boolean existsByPatientId(Long patientId);
}
