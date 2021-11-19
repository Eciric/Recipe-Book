package res.recipebook.Services;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import res.recipebook.Models.Recipe;
import res.recipebook.Models.RecipeImage;
import res.recipebook.Payload.Responses.RecipeFile;
import res.recipebook.Payload.Responses.RecipeResponse;
import res.recipebook.Payload.Responses.Recipes;
import res.recipebook.Properties.FileStorageProperties;
import res.recipebook.Repositories.RecipeImageRepository;
import res.recipebook.Repositories.RecipeRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class RecipeService {

    private final Path fileStorageLocation;
    private final RecipeRepository recipeRepository;
    private final RecipeImageRepository recipeImageRepository;

    public RecipeService(RecipeRepository recipeRepository, FileStorageProperties fileStorageProperties, RecipeImageRepository recipeImageRepository) {
        this.recipeRepository = recipeRepository;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
        this.recipeImageRepository = recipeImageRepository;
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            System.out.println("Could not create a new directory");
        }
    }

    // Get a recipe by id
    public RecipeResponse getRecipeById(int id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        if (recipe.isPresent()) {
            RecipeResponse recipeResponse = new RecipeResponse();
            Recipes[] recipes = new Recipes[1];
            recipes[0] = initializeRecipesObject(recipe.get());
            recipeResponse.setRecipes(recipes);
            return recipeResponse;
        } else {
            return null;
        }
    }

    // Get all recipes of requested user
    public RecipeResponse getRecipesOfUser(int userID) {
        List<Recipe> userRecipes = recipeRepository.findAllByUser_id(userID);
        if (userRecipes.size()==0) return new RecipeResponse();

        return initializeRecipeResponseObject(userRecipes);
    }

    // Get all recipes
    public RecipeResponse getAllRecipes() {
        List<Recipe> recipesList = recipeRepository.findAll();
        if (recipesList.size()==0) return new RecipeResponse();

        return initializeRecipeResponseObject(recipesList);
    }

    // Save a new recipe
    public Recipe storeRecipe(int user_id, MultipartFile[] files, String title, String contents) {
        Recipe newRecipe = new Recipe(user_id, Timestamp.from(Instant.now()), title, contents);
        Recipe confirmedRecipe = recipeRepository.save(newRecipe);
        int recipe_id = confirmedRecipe.getRecipe_id();

        int index = 0;
        for (MultipartFile file: files) {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            try {
                Path targetLocation = this.fileStorageLocation.resolve("recipes/" + recipe_id + "_" + user_id + "_" + fileName + "_" + index++);
                Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                RecipeImage newRecipeImage = new RecipeImage(recipe_id, targetLocation.toString());
                recipeImageRepository.save(newRecipeImage);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        return confirmedRecipe;
    }

    private Recipes initializeRecipesObject(Recipe recipe) {
        Recipes recipes = new Recipes();
        recipes.setRecipeData(recipe);
        recipes.getRecipeData().setRecipe_text("");
        RecipeImage[] recipeImages = recipeImageRepository.findAllByRecipe_id(recipe.getRecipe_id());
        recipes.setFiles(new RecipeFile[recipeImages.length]);

        int index = 0;
        for (RecipeImage recipeImage: recipeImages) {
            String filePath = recipeImage.getImage_path();
            File file = new File(filePath);
            byte[] bytes = new byte[0];
            try {
                bytes = Files.readAllBytes(Path.of(filePath));
            } catch (IOException e) {
                e.printStackTrace();
            }
            RecipeFile recipeFile = new RecipeFile();
            recipeFile.setFile(file);
            recipeFile.setImage(bytes);
            recipes.getFiles()[index] = recipeFile;
        }
        return recipes;
    }

    private RecipeResponse initializeRecipeResponseObject(List<Recipe> recipeList) {
        Recipes[] allUserRecipesWithImages = new Recipes[recipeList.size()];
        for (int i = 0; i < recipeList.size(); i++) {
            Recipes newRecipes = initializeRecipesObject(recipeList.get(i));
            allUserRecipesWithImages[i] = newRecipes;
        }
        RecipeResponse recipeResponse = new RecipeResponse();
        recipeResponse.setRecipes(allUserRecipesWithImages);
        return recipeResponse;
    }

    public void deleteRecipeById(int id) {
        recipeRepository.deleteById(id);
    }

    public void updateRecipe(int recipe_id, String title, int user_id) {
        Optional<Recipe> recipe = recipeRepository.findById(recipe_id);
        if (recipe.isPresent()) {
            recipe.get().setTitle(title);
            recipe.get().setUser_id(user_id);
            recipeRepository.save(recipe.get());
        }
    }
}
