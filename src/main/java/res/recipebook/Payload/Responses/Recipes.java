package res.recipebook.Payload.Responses;

import lombok.Getter;
import lombok.Setter;
import res.recipebook.Models.Recipe;

import java.io.File;

@Getter @Setter
public class Recipes {
    private Recipe recipeData;
    private File file;
    private byte[] image;
}
