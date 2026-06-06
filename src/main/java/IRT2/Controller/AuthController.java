package IRT2.Controller;

import IRT2.SecurityConfig.*;
import IRT2.DTO.*;
import IRT2.Model.*;
import IRT2.Repository.*;
import IRT2.Service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Endpoints d'authentification.
 *
 *  POST /api/auth/login           → PUBLIC       : connexion
 *  POST /api/auth/premier-admin   → PUBLIC       : init (1 seul appel possible)
 *  POST /api/auth/register        → ADMIN only   : crée docteur, secrétaire, caissière...
 *  PATCH /api/auth/users/{id}     → ADMIN only   : active/désactive un compte
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * LOGIN
     *
     * Postman — POST http://localhost:8080/api/auth/login
     * Body (JSON) :
     * {
     *   "username": "dr.kofi",
     *   "password": "motdepasse123"
     * }
     *
     * Réponse 200 :
     * {
     *   "token": "eyJhbGciOiJIUzI1NiJ9...",
     *   "tokenType": "Bearer",
     *   "userId": 1,
     *   "username": "dr.kofi",
     *   "nom": "Kofi",
     *   "prenom": "Ama",
     *   "role": "DOCTEUR"
     * }
     *
     * Réponse 401 si identifiants incorrects :
     * { "status": 401, "message": "Identifiants incorrects" }
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * INIT PREMIER ADMIN — à appeler UNE SEULE FOIS au démarrage
     *
     * Postman — POST http://localhost:8080/api/auth/premier-admin
     * Body :
     * {
     *   "username": "admin",
     *   "password": "Admin123!",
     *   "nom": "Admin",
     *   "prenom": "Principal",
     *   "role": "ADMIN"
     * }
     */
    @PostMapping("/premier-admin")
    public ResponseEntity<Map<String, String>> premierAdmin(
            @Valid @RequestBody RegisterRequest request) {
        authService.initPremierAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Administrateur créé avec succès."));
    }

    /**
     * CRÉER UN UTILISATEUR — ADMIN seulement
     *
     * Postman — POST http://localhost:8080/api/auth/register
     * Header : Authorization: Bearer <token_admin>
     * Body :
     * {
     *   "username": "sec.amina",
     *   "password": "Sec123!",
     *   "nom": "Amina",
     *   "prenom": "Ouedraogo",
     *   "email": "amina@clinique.tg",
     *   "telephone": "+22890000001",
     *   "role": "SECRETAIRE"
     * }
     *
     * Rôles possibles : ADMIN, DOCTEUR, SECRETAIRE, CAISSIERE, PATIENT
     */
    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> register(
            @Valid @RequestBody RegisterRequest request) {
        User user = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Utilisateur créé avec succès.",
                "id",       user.getId(),
                "username", user.getUsername(),
                "role",     user.getRole()
        ));
    }

    /**
     * ACTIVER / DÉSACTIVER un compte — ADMIN seulement
     *
     * Postman — PATCH http://localhost:8080/api/auth/users/3/toggle?actif=false
     * Header : Authorization: Bearer <token_admin>
     */
    @PatchMapping("/users/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> toggle(
            @PathVariable Long id,
            @RequestParam boolean actif) {
        authService.toggleActif(id, actif);
        return ResponseEntity.ok(Map.of(
                "message", "Compte " + (actif ? "activé" : "désactivé") + " avec succès."
        ));
    }
}