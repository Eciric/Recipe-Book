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

    public List<Like> getAllLikes() {
        return likeRepository.findAll();
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
    }

    public void removeUserLike(int like_id) {
       likeRepository.deleteById(like_id);
    }

    public void updateLike(int like_id, int user_id, int recipe_id) {
        Optional<Like> like = likeRepository.findById(like_id);
        if (like.isPresent()) {
            like.get().setUser_id(user_id);
            like.get().setRecipe_id(recipe_id);
            likeRepository.save(like.get());
        }
    }

    public String getUserRecipeLikesCount(int user_id) {
        List<Recipe> userRecipes = recipeRepository.findAllByUser_id(user_id);
        int likes = 0;
        for (Recipe recipe: userRecipes) {
            List<Like> recipeLikes = likeRepository.findAllByRecipe_id(recipe.getRecipe_id());
            likes += recipeLikes.size();
        }
        return String.valueOf(likes);
    }
}
