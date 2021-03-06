package res.recipebook.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import res.recipebook.Models.FavoriteRecipe;
import res.recipebook.Models.Recipe;
import res.recipebook.Payload.Requests.FavoriteRecipeRequest;
import res.recipebook.Payload.Requests.RecipeRequest;
import res.recipebook.Payload.Requests.UpdateRecipeRequest;
import res.recipebook.Payload.Responses.RecipeResponse;
import res.recipebook.Repositories.UserRepository;
import res.recipebook.Security.Services.UserDetailsImpl;
import res.recipebook.Services.FavoriteRecipeService;
import res.recipebook.Services.IngredientService;
import res.recipebook.Services.RecipeService;
import res.recipebook.Services.TagService;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping(path="/api/recipes")
public class RecipeController {
    private final RecipeService recipeService;
    private final TagService tagService;
    private final FavoriteRecipeService favoriteRecipeService;
    private final IngredientService ingredientService;
    private final UserRepository userRepository;

    public RecipeController(RecipeService recipeService, TagService tagService, FavoriteRecipeService favoriteRecipeService, IngredientService ingredientService, UserRepository userRepository) {
        this.recipeService = recipeService;
        this.tagService = tagService;
        this.favoriteRecipeService = favoriteRecipeService;
        this.ingredientService = ingredientService;
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "/storeRecipe", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> storeRecipe(@RequestParam(value = "files") MultipartFile[] files,
                                         @RequestParam(value="title") String title,
                                         @RequestParam(value="contents") String contents) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (userRepository.existsByUsername(userDetails.getUsername()) && userRepository.existsById(userDetails.getId().intValue())) {
                Recipe recipe = recipeService.storeRecipe(userDetails.getId().intValue(), files, title, contents);
                if (recipe != null) return ResponseEntity.ok(recipe);
                return new ResponseEntity<>(HttpStatus.FAILED_DEPENDENCY);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/getAllRecipes", produces = {MediaType.APPLICATION_JSON_VALUE})
    public RecipeResponse getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @PostMapping(value="/getAllUserRecipes", produces = {MediaType.APPLICATION_JSON_VALUE})
    public RecipeResponse getUserRecipes(@RequestBody RecipeRequest request) {
        return recipeService.getRecipesOfUser(request.getId());
    }

    @PostMapping(value="/getRecipeById", produces = {MediaType.APPLICATION_JSON_VALUE})
    public RecipeResponse getRecipe(@RequestBody RecipeRequest request) {
        return recipeService.getRecipeById(request.getId());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value="/deleteRecipeById")
    public ResponseEntity<?> deleteRecipeById(@RequestBody RecipeRequest request) {
        tagService.deleteTagsWithRecipeId(request.getId());
        ingredientService.deleteIngredientsWithRecipeId(request.getId());
        recipeService.deleteRecipeById(request.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value="/updateRecipe")
    public ResponseEntity<?> updateRecipe(@RequestBody UpdateRecipeRequest request) {
        recipeService.updateRecipe(request.getRecipe_id(), request.getTitle(), request.getUser_id());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(path="/getAllFavoriteRecipesByUserId", params="id")
    public List<FavoriteRecipe> getAllFavoriteRecipesByUserId(@RequestParam("id") long id) {
        return this.favoriteRecipeService.getFavoriteRecipesByUser_id((int)id);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping(value="/addFavoriteRecipe")
    public ResponseEntity<?> addFavoriteRecipe(@RequestBody FavoriteRecipeRequest request) {
        favoriteRecipeService.addFavoriteRecipe(request.getRecipe_id(), request.getUser_id());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value="/deleteFavoriteRecipe", params="id")
    public ResponseEntity<?> deleteFavoriteRecipe(@RequestParam("id") long id) {
        favoriteRecipeService.deleteFavoriteRecipe((int)id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
