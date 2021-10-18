package res.recipebook.Services;

import org.springframework.stereotype.Service;
import res.recipebook.Models.Ingredient;
import res.recipebook.Repositories.IngredientRepository;

import java.util.List;
import java.util.Set;

@Service
public class IngredientService {

    public final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> getAllIngredientsByUserId(int user_id) {
        return this.ingredientRepository.findAllByUser_id(user_id);
    }

    public List<Ingredient> getAllIngredientsByRecipeId(int recipe_id) {
        return this.ingredientRepository.findAllByRecipe_id(recipe_id);
    }

    public void addRecipeIngredients(int user_id, int recipe_id, Set<String> ingredients) {
        for (String ingredient: ingredients) {
            Ingredient newIngredient = new Ingredient(ingredient, recipe_id, user_id);
            this.ingredientRepository.save(newIngredient);
        }
    }

    public void deleteIngredientsWithRecipeId(int id) {
        this.ingredientRepository.deleteByRecipe_id(id);
    }
}
