package IRT2.Service;

import IRT2.Model.User;
import IRT2.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User enregistrerUtilisateur(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Cet identifiant est déjà utilisé !");
        }
        // Hachage impératif du mot de passe avec BCrypt avant écriture en base
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

}
