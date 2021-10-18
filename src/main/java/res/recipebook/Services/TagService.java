package res.recipebook.Services;

import org.springframework.stereotype.Service;
import res.recipebook.Models.Tag;
import res.recipebook.Repositories.TagRepository;

import java.util.List;
import java.util.Set;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> getAllTagsByUserId(int user_id) {
        return this.tagRepository.findAllByUser_id(user_id);
    }

    public List<Tag> getAllTagsByRecipeId(int recipe_id) {
        return this.tagRepository.findAllByRecipe_id(recipe_id);
    }

    public void addRecipeTags(int user_id, int recipe_id, Set<String> tags) {
        for (String tag: tags) {
            Tag newTag = new Tag(tag, recipe_id, user_id);
            this.tagRepository.save(newTag);
        }
    }

    public void deleteTagsWithRecipeId(int id) {
        this.tagRepository.deleteByRecipe_id(id);
    }
}
