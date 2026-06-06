package IRT2.Repository;

import IRT2.Model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByUsername(String username);
    Optional<Patient> findById(String username);

    /** Recherche par nom complet ou partiel */
    @Query("SELECT p FROM Patient p WHERE " +
            "LOWER(p.nom) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(p.prenom) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(p.telephone) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Patient> rechercherPatient(@Param("q") String q);
}