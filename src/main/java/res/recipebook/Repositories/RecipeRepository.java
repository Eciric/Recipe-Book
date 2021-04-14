package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import res.recipe.Models.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
}
