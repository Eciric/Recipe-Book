package res.recipebook.Models;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
@Table(name="Users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int user_id;

    private String username;
    private String email;
    private String password;
    private Timestamp date_created;

    public User(String username, String email, String password, Timestamp date_created) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.date_created = date_created;
    }
}
