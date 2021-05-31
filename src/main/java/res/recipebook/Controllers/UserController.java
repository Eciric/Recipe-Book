package res.recipebook.Controllers;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import res.recipebook.Models.User;
import res.recipebook.Payload.Requests.UserRequest;
import res.recipebook.Payload.Responses.UserResponse;
import res.recipebook.Services.UserService;

import javax.print.attribute.standard.Media;
import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping(path="/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value={"/getUserData"}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public UserResponse getUserData(@RequestBody UserRequest request) {
        if (request.getUsername() != null) {
            return userService.getUserDataByUsername(request.getUsername());
        } else {
            return userService.getUserDataById(request.getId());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value="/getAllUsers", produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

}
