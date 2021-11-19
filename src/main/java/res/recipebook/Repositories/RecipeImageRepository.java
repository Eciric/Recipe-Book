package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import res.recipebook.Models.RecipeImage;

public interface RecipeImageRepository extends JpaRepository<RecipeImage, Integer> {
    @Query("select r from RecipeImage r where r.recipe_id=?1")
    RecipeImage[] findAllByRecipe_id(int recipe_id);
}
