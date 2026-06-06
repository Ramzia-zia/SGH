package IRT2.Repository;


import IRT2.Enum.Specialite;
import IRT2.Model.Docteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DocteurRepository extends JpaRepository<Docteur, Long> {

    Optional<Docteur> findByUsername(String username);

    List<Docteur> findBySpecialite(Specialite specialite);

    List<Docteur> findByActif(boolean actif);

    /**
     * Vérifie si un docteur a un rendez-vous à une heure donnée.
     * Utilisé pour détecter les conflits d'agenda avant de créer un RDV.
     * On cherche les RDV du médecin qui tombent dans la plage dateDebut..dateFin.
     */
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
            "FROM RendezVous r WHERE r.docteur.id = :docteurId " +
            "AND r.statut NOT IN ('ANNULE', 'TERMINE') " +
            "AND r.dateEcheance BETWEEN :debut AND :fin")
    boolean hasConflictRdv(@Param("docteurId") Long docteurId,
                           @Param("debut") LocalDateTime debut,
                           @Param("fin") LocalDateTime fin);
}
