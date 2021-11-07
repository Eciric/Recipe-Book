package res.recipebook.Services;

import org.springframework.stereotype.Service;
import res.recipebook.Models.ERole;
import res.recipebook.Models.Role;
import res.recipebook.Models.User;
import res.recipebook.Payload.Responses.UserResponse;
import res.recipebook.Repositories.RecipeImageRepository;
import res.recipebook.Repositories.RoleRepository;
import res.recipebook.Repositories.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RecipeImageRepository recipeImageRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RecipeImageRepository recipeImageRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.recipeImageRepository = recipeImageRepository;
        this.roleRepository = roleRepository;
    }

    public UserResponse getUserDataByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        return userOptional.map(this::initializeUserResponse).orElse(null);
    }

    public UserResponse getUserDataById(int id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(this::initializeUserResponse).orElse(null);
    }

    public UserResponse initializeUserResponse(User user) {
        UserResponse userResponse = new UserResponse();
        String path = user.getPath_to_profile_pic();
        byte[] bytes = new byte[0];
        if (path != null && !path.isEmpty()) {
            try {
                bytes = Files.readAllBytes(Path.of(path));
            } catch (IOException e) {
                e.printStackTrace();
            }
            userResponse.setProfile_picture(bytes);
        } else {
            userResponse.setProfile_picture(null);
        }
        userResponse.setUser_id(user.getUser_id());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        return userResponse;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }

    public void updateUser(int user_id, String username, Set<String> roles, String email) {
        Optional<User> user = userRepository.findById(user_id);
        if (user.isPresent()) {
            user.get().setUsername(username);
            user.get().setRoles(initializeRoles(roles));
            user.get().setEmail(email);
            userRepository.save(user.get());
        }
    }

    public Set<Role> initializeRoles(Set<String> roles) {
        Set<Role> newRoles = new HashSet<>();
        roles.forEach(role -> {
            if ("ROLE_ADMIN".equals(role)) {
                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                newRoles.add(adminRole);
            } else {
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                newRoles.add(userRole);
            }
        });
        return newRoles;
    }
}
