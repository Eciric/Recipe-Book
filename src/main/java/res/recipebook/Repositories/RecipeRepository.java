package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import res.recipebook.Models.Recipe;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    @Query("select r from Recipe r where r.user_id=?1")
    List<Recipe> findAllByUser_id(int user_id);
}
