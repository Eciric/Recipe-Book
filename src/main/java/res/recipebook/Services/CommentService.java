package res.recipebook.Services;

import org.springframework.stereotype.Service;
import res.recipebook.Models.Comment;
import res.recipebook.Repositories.CommentRepository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public List<Comment> getAllRecipeComments(int recipe_id) {
        return commentRepository.findAllByRecipe_id(recipe_id);
    }

    public void addComment(int user_id, int recipe_id, String username, String message) {
        commentRepository.save(new Comment(recipe_id, user_id, username, message, Timestamp.from(Instant.now())));
    }

    public void deleteComment(int comment_id) {
        Optional<Comment> comment = commentRepository.findById(comment_id);
        comment.ifPresent(commentRepository::delete);
    }
}
