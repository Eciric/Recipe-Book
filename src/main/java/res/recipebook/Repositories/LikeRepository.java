package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import res.recipebook.Models.Like;

public interface LikeRepository extends JpaRepository<Like, Integer> {
}
