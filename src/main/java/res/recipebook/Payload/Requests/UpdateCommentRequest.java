package res.recipebook.Payload.Requests;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateCommentRequest {
    private int comment_id;
    private int user_id;
    private int recipe_id;
}
