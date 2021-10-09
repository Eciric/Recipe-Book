package res.recipebook.Models;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
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
    private Integer reply_comment_id;
    @Size(max = 1000)
    private String message;
    private Timestamp date_created;

    public Comment(int recipe_id, int user_id, String message, int reply_comment_id, Timestamp date_created) {
        this.recipe_id = recipe_id;
        this.user_id = user_id;
        this.message = message;
        this.reply_comment_id = reply_comment_id;
        this.date_created = date_created;
    }
}