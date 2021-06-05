package res.recipebook.Payload.Requests;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateLikeRequest {
    int like_id;
    int user_id;
    int recipe_id;
}
