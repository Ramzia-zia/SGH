package IRT2.Enum;
/**
 * Cycle de vie d'un rendez-vous :
 *
 *  EN_ATTENTE → CONFIRME → TERMINE
 *             ↘ ANNULE
 */
public enum StatusRendezVous {
    EN_ATTENTE,   // Créé par la secrétaire, pas encore validé
    CONFIRME,     // Validé par la secrétaire / le médecin
    ANNULE,       // Annulé (patient absent, médecin indisponible...)
    TERMINE       // Consultation effectuée
}