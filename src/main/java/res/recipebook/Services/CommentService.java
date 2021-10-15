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

    public void addComment(int user_id, int recipe_id, String message, int reply_comment_id) {
        commentRepository.save(new Comment(recipe_id, user_id, message, reply_comment_id, Timestamp.from(Instant.now())));
    }

    public void deleteComment(int comment_id) {
        Optional<Comment> comment = commentRepository.findById(comment_id);
        comment.ifPresent(commentRepository::delete);
    }

    public void updateComment(int comment_id, int user_id, int recipe_id) {
        Optional<Comment> comment = commentRepository.findById(comment_id);
        if (comment.isPresent()) {
            comment.get().setUser_id(user_id);
            comment.get().setRecipe_id(recipe_id);
            commentRepository.save(comment.get());
        }
    }

    public void changeMessage(int comment_id, String newMessage) {
        Optional<Comment> comment = commentRepository.findById(comment_id);
        if (comment.isPresent()) {
            comment.get().setMessage(newMessage);
            commentRepository.save(comment.get());
        }
    }

    public List<Comment> getCommentReplies(int comment_id) {
        System.out.println("getting replies for commentid: " + comment_id);
        return commentRepository.findAllRepliesByComment_id(comment_id);
    }
}
