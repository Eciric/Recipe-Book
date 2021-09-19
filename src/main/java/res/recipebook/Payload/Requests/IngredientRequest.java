package res.recipebook.Payload.Requests;


import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter @Setter
public class IngredientRequest {
    int user_id;
    int recipe_id;
    Set<String> ingredients;
}
