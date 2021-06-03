package res.recipebook.Payload.Requests;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CommentRequest {
    int recipe_id;
    int user_id;
    int comment_id;
    String username;
    String message;
}
