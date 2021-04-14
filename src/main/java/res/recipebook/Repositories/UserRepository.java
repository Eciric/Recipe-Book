package res.recipebook.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import res.recipe.Models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
