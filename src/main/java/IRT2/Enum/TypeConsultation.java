package IRT2.Enum;
/**
 * Discriminant utilisé par JPA (@DiscriminatorColumn) pour savoir
 * dans quelle table fille chercher les données spécifiques.
 *
 * Consultation (table mère)
 *   ├─ OPHTALMOLOGIE → table consultation_ophtalmologie
 *   ├─ DERMATOLOGIE → table consultation_dermatologie
 *   └─ MÉDECINE_GENERALE → table consultation_medecine_generale
 */
public enum TypeConsultation {
    MEDECINE_GENERALE,
    OPHTALMOLOGIE,
    DERMATOLOGIE
}
