package IRT2.Enum;
/**
 * Rôles du système.
 * Chaque utilisateur a UN seul rôle.
 * Spring Security préfixe automatiquement "ROLE_" → ROLE_ADMIN, ROLE_DOCTEUR, etc.
 * ADMIN → directeur, peut tout faire
 * DOCTEUR → consulte, prescrit, voit ses patients
 * SECRETAIRE → gère les rendez-vous, inscrit les patients
 * CAISSIERE → encaisse, émet les bons de paiement
 * PATIENT→ consulte son propre dossier (portail patient)
 */
public enum Role {
    ADMIN,
    DOCTEUR,
    SECRETAIRE,
    CAISSIERE,
    PATIENT
}