package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import res.recipebook.Models.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("select r from Comment r where r.recipe_id=?1 and r.reply_comment_id = 0")
    List<Comment> findAllByRecipe_id(int recipe_id);

    @Query("select r from Comment r where r.reply_comment_id=?1")
    List<Comment> findAllRepliesByComment_id(int comment_id);
}

