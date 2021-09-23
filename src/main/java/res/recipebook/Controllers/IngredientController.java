package res.recipebook.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import res.recipebook.Models.Ingredient;
import res.recipebook.Payload.Requests.IngredientRequest;
import res.recipebook.Payload.Requests.LikeRequest;
import res.recipebook.Services.IngredientService;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping(path="/getAllIngredientsByRecipeId", params="id")
    public List<Ingredient> getAllIngredientsByRecipeId(@RequestParam("id") long id) {
        return this.ingredientService.getAllIngredientsByRecipeId((int)id);
    }

    @GetMapping(path="/getAllIngredientsByUserId", params="id")
    public List<Ingredient> getAllIngredientsByUserId(@RequestParam("id") long id) {
        return this.ingredientService.getAllIngredientsByUserId((int)id);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping(value="/addRecipeIngredients")
    public ResponseEntity<?> addRecipeIngredients(@RequestBody IngredientRequest ingredientRequest) {
        ingredientService.addRecipeIngredients(ingredientRequest.getUser_id(), ingredientRequest.getRecipe_id(), ingredientRequest.getIngredients());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
