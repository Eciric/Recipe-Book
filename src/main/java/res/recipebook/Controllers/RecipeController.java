package res.recipebook.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import res.recipebook.Services.FileStorageService;
import res.recipebook.Services.RecipeService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping(path="/api/recipes")
public class RecipeController {
    private final RecipeService recipeStorageService;

    public RecipeController(RecipeService recipeStorageService) {
        this.recipeStorageService = recipeStorageService;
    }
}
