package res.recipebook.Payload.Responses;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserResponse {
    private String username;
    private int user_id;
    private byte[] profile_picture;
}
