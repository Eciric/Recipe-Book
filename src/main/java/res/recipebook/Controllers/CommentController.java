package res.recipebook.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import res.recipebook.Models.Comment;
import res.recipebook.Models.Tag;
import res.recipebook.Payload.Requests.ChangeCommentMessageRequest;
import res.recipebook.Payload.Requests.CommentRequest;
import res.recipebook.Payload.Requests.UpdateCommentRequest;
import res.recipebook.Services.CommentService;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(value="/getAllComments", produces={MediaType.APPLICATION_JSON_VALUE})
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @PostMapping(value="/getAllRecipeComments", produces={MediaType.APPLICATION_JSON_VALUE})
    public List<Comment> getAllRecipeComments(@RequestBody CommentRequest request) {
        return commentService.getAllRecipeComments(request.getRecipe_id());
    }

    @GetMapping(path="/getCommentReplies", params="id")
    public List<Comment> getAllRepliesByCommentId(@RequestParam("id") long id) {
        return commentService.getCommentReplies((int)id);
    }


    @PreAuthorize("hasRole('USER')")
    @PutMapping(value="/addComment")
    public ResponseEntity<?> addComment(@RequestBody CommentRequest request) {
        commentService.addComment(request.getUser_id(), request.getRecipe_id(), request.getMessage(), request.getReply_comment_id());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value="/deleteComment")
    public ResponseEntity<?> deleteComment(@RequestBody CommentRequest request) {
        commentService.deleteComment(request.getComment_id());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "/changeCommentMessage")
    public ResponseEntity<?> updateComment(@RequestBody ChangeCommentMessageRequest request) {
        commentService.changeMessage(request.getComment_id(), request.getMessage());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/updateComment")
    public ResponseEntity<?> updateComment(@RequestBody UpdateCommentRequest request) {
        commentService.updateComment(request.getComment_id(), request.getUser_id(), request.getRecipe_id());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
