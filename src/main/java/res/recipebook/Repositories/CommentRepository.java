package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import res.recipebook.Models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
