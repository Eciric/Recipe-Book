package res.recipebook.Payload.Requests;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateRecipeRequest {
    private int recipe_id;
    private String title;
    private int user_id;
}
