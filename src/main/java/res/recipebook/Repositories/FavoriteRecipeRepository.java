package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import res.recipebook.Models.FavoriteRecipe;

import java.util.List;

public interface FavoriteRecipeRepository extends JpaRepository<FavoriteRecipe, Integer> {

    @Query("select r from FavoriteRecipe r where r.user_id=?1")
    List<FavoriteRecipe> findAllByUser_id(int user_id);
}
