package res.recipebook.Payload.Responses;

import lombok.Getter;
import lombok.Setter;
import res.recipebook.Models.Recipe;


@Getter @Setter
public class RecipeResponse {
    private Recipes[] recipes;
}
