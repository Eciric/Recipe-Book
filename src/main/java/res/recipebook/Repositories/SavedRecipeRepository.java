package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import res.recipebook.Models.SavedRecipe;

public interface SavedRecipeRepository extends JpaRepository<SavedRecipe, Integer> {
}
