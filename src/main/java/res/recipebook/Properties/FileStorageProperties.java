package res.recipebook.Properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter @Setter
@Component
public class FileStorageProperties {
    @Value("${RecipeBook.uploadDir}")
    private String uploadDir;
}
