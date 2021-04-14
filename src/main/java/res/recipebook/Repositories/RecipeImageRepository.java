package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import res.recipe.Models.RecipeImage;

public interface RecipeImageRepository extends JpaRepository<RecipeImage, Integer> {
}
