package res.recipebook.Models;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name="ingredients")
public class Ingredient {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int ingredient_id;

    private String ingredient;
    private int recipe_id;
    private int user_id;

    public Ingredient(String ingredient, int recipe_id, int user_id) {
        this.ingredient = ingredient;
        this.recipe_id = recipe_id;
        this.user_id = user_id;
    }
}
