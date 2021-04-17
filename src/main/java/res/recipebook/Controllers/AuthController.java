package res.recipebook.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import res.recipebook.Models.User;
import res.recipebook.Payload.Requests.LoginRequest;
import res.recipebook.Payload.Requests.SignupRequest;
import res.recipebook.Payload.Responses.JwtResponse;
import res.recipebook.Payload.Responses.MessageResponse;
import res.recipebook.Repositories.UserRepository;
import res.recipebook.Security.JWT.JwtUtils;
import res.recipebook.Security.Services.UserDetailsImpl;

import java.sql.Timestamp;
import java.time.Instant;


@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = "ROLE_USER";

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                role
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest){
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
        }

        Timestamp date_created = Timestamp.from(Instant.now());
        String role = "ROLE_USER";
        User user = new User(signupRequest.getUsername(), signupRequest.getEmail(), signupRequest.getPassword(), date_created ,role);

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Success: User registered successfully!"));
    }
}
