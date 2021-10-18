package res.recipebook.Services;

import org.springframework.stereotype.Service;
import res.recipebook.Models.Comment;
import res.recipebook.Models.FavoriteRecipe;
import res.recipebook.Repositories.FavoriteRecipeRepository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteRecipeService {
    private final FavoriteRecipeRepository favoriteRecipeRepository;

    FavoriteRecipeService(FavoriteRecipeRepository favoriteRecipeRepository) {
        this.favoriteRecipeRepository = favoriteRecipeRepository;
    }

    public List<FavoriteRecipe> getFavoriteRecipesByUser_id(int id) {
        return favoriteRecipeRepository.findAllByUser_id(id);
    }

    public void addFavoriteRecipe(int recipe_id, int user_id) {
        favoriteRecipeRepository.save(new FavoriteRecipe(recipe_id, user_id));
    }

    public void deleteFavoriteRecipe(int id) {
        Optional<FavoriteRecipe> favoriteRecipe = favoriteRecipeRepository.findById(id);
        favoriteRecipe.ifPresent(favoriteRecipeRepository::delete);
    }

}
