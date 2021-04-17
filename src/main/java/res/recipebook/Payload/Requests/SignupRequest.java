package res.recipebook.Payload.Requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String username;
    private String email;
    private String role;
    private String password;
}
