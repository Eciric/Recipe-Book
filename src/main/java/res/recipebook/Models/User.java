package res.recipebook.Models;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(name="user_roles",
    joinColumns = @JoinColumn(name="user_id"),
    inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String username, String email, String password, Timestamp date_created) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.date_created = date_created;
    }
}
