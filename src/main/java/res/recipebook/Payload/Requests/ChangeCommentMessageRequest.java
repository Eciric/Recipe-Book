package res.recipebook.Payload.Requests;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class ChangeCommentMessageRequest {
    private int comment_id;
    private String message;
}
