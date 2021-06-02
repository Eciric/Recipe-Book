package res.recipebook.Services;

import org.springframework.stereotype.Service;
import res.recipebook.Models.Like;
import res.recipebook.Repositories.LikeRepository;

import java.util.List;

@Service
public class LikeService {

    private final LikeRepository likeRepository;

    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
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

    public void removeUserLike(int user_id, int recipe_id) {
        List<Like> userLikes = likeRepository.findAllByUser_id(user_id);

        for (Like userLike : userLikes) {
            if (userLike.getRecipe_id() == recipe_id) {
                likeRepository.deleteById(userLike.getLike_id());
                break;
            }
        }
    }


}
