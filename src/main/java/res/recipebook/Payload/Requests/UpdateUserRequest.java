package res.recipebook.Payload.Requests;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter @Setter
public class UpdateUserRequest {
    private int user_id;
    private String username;
    private Set<String> roles;
    private String email;
}
