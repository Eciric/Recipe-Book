package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import res.recipebook.Models.Like;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Integer> {
    @Query("select r from Like r where r.user_id=?1")
    List<Like> findAllByUser_id(int user_id);

    @Query("select r from Like r where r.recipe_id=?1")
    List<Like> findAllByRecipe_id(int recipe_id);
}
