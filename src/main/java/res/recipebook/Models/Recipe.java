package res.recipebook.Models;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
@Table(name="Recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int recipe_id;

    private int user_id;
    private Timestamp date_created;
    private String title;
    private String recipe_text;

    public Recipe(int user_id, Timestamp date_created, String title, String recipe_text) {
        this.user_id = user_id;
        this.date_created = date_created;
        this.title = title;
        this.recipe_text = recipe_text;
    }
}