package res.recipebook.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import res.recipebook.Payload.Requests.RecipeRequest;
import res.recipebook.Payload.Responses.RecipeResponse;
import res.recipebook.Repositories.UserRepository;
import res.recipebook.Security.Services.UserDetailsImpl;
import res.recipebook.Services.RecipeService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping(path="/api/recipes")
public class RecipeController {
    private final RecipeService recipeService;
    private final UserRepository userRepository;

    public RecipeController(RecipeService recipeService, UserRepository userRepository) {
        this.recipeService = recipeService;
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/storeRecipe", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> storeRecipe(@RequestParam(value = "file") MultipartFile file,
                                         @RequestParam(value="title") String title,
                                         @RequestParam(value="contents") String contents) {
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (userRepository.existsByUsername(userDetails.getUsername()) && userRepository.existsById(userDetails.getId().intValue())) {
                boolean ok = recipeService.storeRecipe(userDetails.getId().intValue(), file, title, contents);
                if (ok) return new ResponseEntity<>(HttpStatus.OK);
                else return new ResponseEntity<>(HttpStatus.FAILED_DEPENDENCY);
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
        System.out.println(request.getId());
        return new RecipeResponse();
    }
}
