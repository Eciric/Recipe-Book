package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import res.recipebook.Models.Ingredient;
import res.recipebook.Models.Like;

import javax.transaction.Transactional;
import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    @Query("select r from Ingredient r where r.user_id=?1")
    List<Ingredient> findAllByUser_id(int user_id);

    @Query("select r from Ingredient r where r.recipe_id=?1")
    List<Ingredient> findAllByRecipe_id(int recipe_id);

    @Modifying
    @Transactional
    @Query("delete from Ingredient i where i.recipe_id=?1")
    void deleteByRecipe_id(int recipe_id);
}
