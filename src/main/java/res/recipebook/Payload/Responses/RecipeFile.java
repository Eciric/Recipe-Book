package res.recipebook.Payload.Responses;

import lombok.Getter;
import lombok.Setter;

import java.io.File;

@Getter @Setter
public class RecipeFile {
    private File file;
    private byte[] image;
}
