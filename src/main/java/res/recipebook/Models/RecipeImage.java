package res.recipebook.Models;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name="Recipe Images")
public class RecipeImage {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int image_id;

    private int recipe_id;
    private String image_path;

    public RecipeImage(int recipe_id, String image_path) {
        this.recipe_id = recipe_id;
        this.image_path = image_path;
    }
}