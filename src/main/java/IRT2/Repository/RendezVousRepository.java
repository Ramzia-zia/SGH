package IRT2.Repository;

import IRT2.Enum.StatusRendezVous;
import IRT2.Model.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {

    List<RendezVous> findByPatientId(Long patientId);

    List<RendezVous> findByDocteurId(Long docteurId);

    List<RendezVous> findByStatut(StatusRendezVous statut);

    /** RDV d'un médecin pour une journée donnée (utile pour l'agenda) */
    @Query("SELECT r FROM RendezVous r WHERE r.docteur.id = :docteurId " +
            "AND r.dateEcheance BETWEEN :debut AND :fin " +
            "ORDER BY r.dateEcheance ASC")
    List<RendezVous> findByDocteurAndPeriode(@Param("docteurId") Long docteurId,
                                             @Param("debut") LocalDateTime debut,
                                             @Param("fin") LocalDateTime fin);
}