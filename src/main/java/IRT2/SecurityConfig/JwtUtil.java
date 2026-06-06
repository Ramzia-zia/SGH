package IRT2.SecurityConfig;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Utilitaire JWT.
 *
 * Un token JWT ressemble à ça :
 *   eyJhbGciOiJIUzI1NiJ9         ← Header  (algorithme)
 *   .eyJzdWIiOiJkci5rb2ZpIn0     ← Payload (données : username, rôle, expiration)
 *   .SflKxwRJSMeKKF2QT4fw        ← Signature (vérifie l'intégrité)
 *
 * Le serveur peut vérifier la signature SANS base de données → stateless.
 * Si quelqu'un modifie le payload, la signature ne correspond plus → rejeté.
 */
@Component
@Slf4j
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretString;

    @Value("${jwt.expiration}")
    private long expiration;

    private Key signingKey;

    /**
     * Exécuté une seule fois après l'injection des propriétés.
     * On crée la clé cryptographique une seule fois au démarrage.
     */
    @PostConstruct
    public void init() {
        this.signingKey = Keys.hmacShaKeyFor(secretString.getBytes());
        log.info("JwtUtil initialisé. Expiration token : {} ms", expiration);
    }

    /**
     * Génère un token JWT pour un utilisateur authentifié.
     *
     * Le token contient (dans le Payload) :
     *  - sub  : le username
     *  - role : le rôle (ex: "ROLE_DOCTEUR")
     *  - iat  : heure de création (issued at)
     *  - exp  : heure d'expiration
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // On met le rôle dans le token pour ne pas interroger la BDD à chaque requête
        claims.put("role", userDetails.getAuthorities()
                .iterator().next()
                .getAuthority());
        return buildToken(claims, userDetails.getUsername());
    }

    private String buildToken(Map<String, Object> claims, String subject) {
        Date now    = new Date();
        Date expiry = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /** Extrait le username (champ "sub") du token */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /** Extrait la date d'expiration */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /** Méthode générique pour extraire n'importe quel claim */
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        return resolver.apply(extractAllClaims(token));
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Validation complète :
     * 1. Le username dans le token = l'utilisateur chargé depuis la BDD
     * 2. Le token n'est pas expiré
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            String username = extractUsername(token);
            return username.equals(userDetails.getUsername())
                    && !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Token invalide : {}", e.getMessage());
            return false;
        }
    }
}