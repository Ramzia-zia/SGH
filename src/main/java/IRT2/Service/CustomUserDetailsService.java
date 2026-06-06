package IRT2.Service;

import IRT2.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * PONT entre Spring Security et notre base de données.
 *
 * Spring Security appelle loadUserByUsername() dans deux situations :
 *
 *  1. Lors du LOGIN :
 *     AuthenticationManager → DaoAuthenticationProvider
 *     → loadUserByUsername("dr.kofi")
 *     → compare le password soumis avec le hash BCrypt stocké.
 *
 *  2. Lors de CHAQUE REQUÊTE avec un token JWT :
 *     Je wtAuthFilter extrait l'username du token
 *     → loadUserByUsername("dr.kofi")
 *     → recharge l'utilisateur avec ses rôles à jour
 *
 * Notre User implémente UserDetails, donc on peut le retourner directement.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        log.debug("Chargement de l'utilisateur : {}", username);

        return userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.warn("Utilisateur introuvable : {}", username);
                    // Message volontairement générique :
                    // on ne dit pas si c'est l'username ou le password qui est faux
                    return new UsernameNotFoundException(
                            "Identifiants incorrects"
                    );
                });
    }
}