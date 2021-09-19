package res.recipebook.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import res.recipebook.Models.Tag;
import res.recipebook.Payload.Requests.TagRequest;
import res.recipebook.Services.TagService;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/tags")
public class TagController {
    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping(path="/getAllTagsByRecipeId", params="id")
    public List<Tag> getAllTagsByRecipeId(@RequestParam("id") long id) {
        return this.tagService.getAllTagsByRecipeId((int)id);
    }

    @GetMapping(path="/getAllTagsByUserId", params="id")
    public List<Tag> getAllTagsByUserId(@RequestParam("id") long id) {
        return this.tagService.getAllTagsByUserId((int)id);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping(value="/addRecipeTags")
    public ResponseEntity<?> addRecipeTags(@RequestBody TagRequest tagRequest) {
        tagService.addRecipeTags(tagRequest.getUser_id(), tagRequest.getRecipe_id(), tagRequest.getTags());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
