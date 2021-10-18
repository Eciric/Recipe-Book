package res.recipebook.Models;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name="favorite_recipes")
public class FavoriteRecipe {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int favorite_id;

    private int recipe_id;
    private int user_id;

    public FavoriteRecipe( int recipe_id, int user_id) {
        this.recipe_id = recipe_id;
        this.user_id = user_id;
    }
}
