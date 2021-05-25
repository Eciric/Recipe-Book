package res.recipebook.Payload.Responses;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RecipeResponse {
    private Recipes[] recipes;
}
