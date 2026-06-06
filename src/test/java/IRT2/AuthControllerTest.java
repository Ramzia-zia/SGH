package IRT2;


import IRT2.DTO.*;
import IRT2.Enum.*;
import IRT2.Model.*;
import IRT2.Repository.*;
import IRT2.Service.*;
import IRT2.SecurityConfig.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Tests d'intégration du controller HTTP.
 *
 * @WebMvcTest      : charge seulement la couche web (pas la BDD)
 * MockMvc          : simule des requêtes HTTP sans démarrer Tomcat
 * @MockBean         : remplace le Service par un faux
 * @WithMockUser     : simule un utilisateur connecté avec un rôle
 */
@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired MockMvc       mockMvc;
    @Autowired ObjectMapper  objectMapper;

    @MockBean AuthService authService;

    // ─── POST /api/auth/login ───────────────────────────────────────

    @Test
    @DisplayName("POST /login → 200 avec token si identifiants corrects")
    void login_returns200_withToken() throws Exception {
        // GIVEN
        LoginRequest req = new LoginRequest();
        req.setUsername("dr.kofi");
        req.setPassword("motdepasse123");

        LoginResponse resp = new LoginResponse(
                "fake.jwt.token", 1L, "dr.kofi", "Kofi", "Ama", Role.DOCTEUR
        );
        when(authService.login(any())).thenReturn(resp);

        // WHEN + THEN
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("fake.jwt.token"))
                .andExpect(jsonPath("$.role").value("DOCTEUR"))
                .andExpect(jsonPath("$.username").value("dr.kofi"));
    }

    @Test
    @DisplayName("POST /login → 401 si mauvais mot de passe")
    void login_returns401_forBadCredentials() throws Exception {
        // GIVEN
        LoginRequest req = new LoginRequest();
        req.setUsername("dr.kofi");
        req.setPassword("mauvais");

        when(authService.login(any()))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        // WHEN + THEN
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Identifiants incorrects."));
    }

    @Test
    @DisplayName("POST /login → 400 si body incomplet (@Valid)")
    void login_returns400_ifUsernameBlank() throws Exception {
        // GIVEN : username vide → @NotBlank déclenche l'erreur
        LoginRequest req = new LoginRequest();
        req.setUsername("");
        req.setPassword("pass123");

        // WHEN + THEN
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest());
    }

    // ─── POST /api/auth/register ───────────────────────────────────

    @Test
    @DisplayName("POST /register → 403 sans token (non connecté)")
    void register_returns403_whenNotAuthenticated() throws Exception {
        RegisterRequest req = new RegisterRequest();
        req.setUsername("sec.amina"); req.setPassword("pass123!");
        req.setNom("Amina"); req.setPrenom("O"); req.setRole(Role.SECRETAIRE);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("POST /register → 403 si rôle DOCTEUR (pas ADMIN)")
    @WithMockUser(roles = "DOCTEUR")   // Simule un docteur connecté
    void register_returns403_forDocteurRole() throws Exception {
        RegisterRequest req = new RegisterRequest();
        req.setUsername("new.user"); req.setPassword("pass123!");
        req.setNom("X"); req.setPrenom("Y"); req.setRole(Role.SECRETAIRE);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("POST /register → 201 si rôle ADMIN")
    @WithMockUser(roles = "ADMIN")   // Simule un admin connecté
    void register_returns201_forAdminRole() throws Exception {
        // GIVEN
        RegisterRequest req = new RegisterRequest();
        req.setUsername("sec.amina"); req.setPassword("pass123!");
        req.setNom("Amina"); req.setPrenom("O"); req.setRole(Role.SECRETAIRE);

        com.sgh.hospital.model.User user = com.sgh.hospital.model.User.builder()
                .id(5L).username("sec.amina")
                .password("hashed").nom("Amina").prenom("O")
                .role(Role.SECRETAIRE).actif(true).build();

        when(authService.register(any())).thenReturn(user);

        // WHEN + THEN
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("sec.amina"));
    }

    // ─── PATCH /api/auth/users/{id}/toggle ─────────────────────────

    @Test
    @DisplayName("PATCH /users/1/toggle → 403 si rôle CAISSIERE")
    @WithMockUser(roles = "CAISSIERE")
    void toggle_returns403_forCaissiere() throws Exception {
        mockMvc.perform(patch("/api/auth/users/1/toggle")
                        .param("actif", "false"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("PATCH /users/1/toggle → 200 si rôle ADMIN")
    @WithMockUser(roles = "ADMIN")
    void toggle_returns200_forAdmin() throws Exception {
        mockMvc.perform(patch("/api/auth/users/1/toggle")
                        .param("actif", "false"))
                .andExpect(status().isOk());
    }
}