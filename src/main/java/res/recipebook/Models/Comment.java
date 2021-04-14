package res.recipebook.Models;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name="Comments")
public class Comment {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int comment_id;

    private int recipe_id;
    private int user_id;
    private String message;
    private Timestamp date_created;

    public Comment(int recipe_id, int user_id, String message, Timestamp date_created) {
        this.recipe_id = recipe_id;
        this.user_id = user_id;
        this.message = message;
        this.date_created = date_created;
    }
}