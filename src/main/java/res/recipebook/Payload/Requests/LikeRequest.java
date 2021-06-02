package res.recipebook.Payload.Requests;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LikeRequest {
    int user_id;
    int recipe_id;
}
