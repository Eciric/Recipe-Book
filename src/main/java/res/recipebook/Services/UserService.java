package res.recipebook.Services;

import org.springframework.stereotype.Service;
import res.recipebook.Models.User;
import res.recipebook.Payload.Responses.UserResponse;
import res.recipebook.Repositories.RecipeImageRepository;
import res.recipebook.Repositories.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RecipeImageRepository recipeImageRepository;

    public UserService(UserRepository userRepository, RecipeImageRepository recipeImageRepository) {
        this.userRepository = userRepository;
        this.recipeImageRepository = recipeImageRepository;
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
        return userResponse;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
