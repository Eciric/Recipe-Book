package res.recipebook.Payload.Requests;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter @Setter
public class TagRequest {
    int user_id;
    int recipe_id;
    Set<String> tags;
}
