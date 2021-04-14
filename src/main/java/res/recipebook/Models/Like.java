package res.recipebook.Models;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name="Likes")
public class Like {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int like_id;

    private int user_id;
    private int recipe_id;

    public Like(int user_id, int recipe_id) {
        this.user_id = user_id;
        this.recipe_id = recipe_id;
    }
}