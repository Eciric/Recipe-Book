package res.recipebook.Models;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Table(name="tags")
public class Tag {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int tag_id;

    private String tag;
    private int recipe_id;
    private int user_id;

    public Tag(String tag, int recipe_id, int user_id) {
        this.tag = tag;
        this.recipe_id = recipe_id;
        this.user_id = user_id;
    }
}
