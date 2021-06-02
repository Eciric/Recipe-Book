package res.recipebook.Services;

import org.springframework.stereotype.Service;
import res.recipebook.Models.Like;
import res.recipebook.Models.Recipe;
import res.recipebook.Repositories.LikeRepository;
import res.recipebook.Repositories.RecipeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final RecipeRepository recipeRepository;

    public LikeService(LikeRepository likeRepository, RecipeRepository recipeRepository) {
        this.likeRepository = likeRepository;
        this.recipeRepository = recipeRepository;
    }

    public List<Like> getUserLikes(int user_id) {
        return likeRepository.findAllByUser_id(user_id);
    }

    public List<Like> getRecipeLikes(int recipe_id) {
        return likeRepository.findAllByRecipe_id(recipe_id);
    }

    public void addUserLike(int user_id, int recipe_id) {
        Like like = new Like();
        like.setUser_id(user_id);
        like.setRecipe_id(recipe_id);
        likeRepository.save(like);
        updateRecipeLikes(recipe_id);
    }

    public void removeUserLike(int user_id, int recipe_id) {
        List<Like> userLikes = likeRepository.findAllByUser_id(user_id);

        for (Like userLike : userLikes) {
            if (userLike.getRecipe_id() == recipe_id) {
                likeRepository.deleteById(userLike.getLike_id());
                updateRecipeLikes(recipe_id);
                break;
            }
        }
    }

    public void updateRecipeLikes(int recipe_id) {
        Optional<Recipe> recipe = recipeRepository.findById(recipe_id);
        if (recipe.isPresent()) {
            List<Like> likes = likeRepository.findAllByRecipe_id(recipe_id);
            int likesCount = likes.size();
            recipe.get().setLikes(likesCount);
            recipeRepository.save(recipe.get());
        }
    }
}
