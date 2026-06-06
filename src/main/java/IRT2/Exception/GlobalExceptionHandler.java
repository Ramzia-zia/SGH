package IRT2.Exception;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

/**
 * Intercepte toutes les exceptions et retourne un JSON uniforme.
 *
 * React reçoit toujours la même structure d'erreur :
 * {
 *   "status":    401,
 *   "message":   "Identifiants incorrects",
 *   "timestamp": "2025-01-15T10:30:00"
 * }
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @Data @AllArgsConstructor
    static class ErrorResponse {
        private int    status;
        private String message;
        private LocalDateTime timestamp;
    }

    private ErrorResponse error(int status, String message) {
        return new ErrorResponse(status, message, LocalDateTime.now());
    }

    /** 401 — username ou password incorrect */
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleBadCredentials(BadCredentialsException e) {
        return error(401, "Identifiants incorrects.");
    }

    /** 401 — compte désactivé par l'admin */
    @ExceptionHandler(DisabledException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleDisabled(DisabledException e) {
        return error(401, "Compte désactivé. Contactez l'administrateur.");
    }

    /** 403 — connecté mais rôle insuffisant */
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleForbidden(AccessDeniedException e) {
        return error(403, "Accès refusé : vous n'avez pas les permissions nécessaires.");
    }

    /** 409 — username ou email déjà pris */
    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleConflict(IllegalStateException e) {
        return error(409, e.getMessage());
    }

    /** 400 — champs @Valid invalides */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getAllErrors().stream()
                .map(err -> {
                    String field = ((FieldError) err).getField();
                    return field + ": " + err.getDefaultMessage();
                })
                .collect(Collectors.joining(" | "));
        return error(400, message);
    }

    /** 500 — erreur inattendue */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGeneric(Exception e) {
        log.error("Erreur inattendue", e);
        return error(500, "Erreur interne du serveur.");
    }
}