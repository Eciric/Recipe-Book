package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import res.recipebook.Models.Tag;

import javax.transaction.Transactional;
import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    @Query("select r from Tag r where r.user_id=?1")
    List<Tag> findAllByUser_id(int user_id);

    @Query("select r from Tag r where r.recipe_id=?1")
    List<Tag> findAllByRecipe_id(int recipe_id);

    @Modifying
    @Transactional
    @Query("delete from Tag t where t.recipe_id=?1")
    void deleteByRecipe_id(int recipe_id);
}
