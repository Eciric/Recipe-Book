package res.recipebook.Bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import res.recipebook.Models.Recipe;
import res.recipebook.Payload.Responses.RecipeResponse;
import res.recipebook.Payload.Responses.Recipes;
import res.recipebook.Repositories.RoleRepository;
import res.recipebook.Services.FileStorageService;
import res.recipebook.Services.RecipeService;

import java.util.Arrays;


@Component
public class BootstrapData implements CommandLineRunner {

    public final RoleRepository roleRepository;
    public final FileStorageService fileStorageService;
    public final RecipeService recipeService;
    public BootstrapData(RoleRepository roleRepository, FileStorageService fileStorageService, RecipeService recipeService) {
        this.roleRepository = roleRepository;
        this.fileStorageService = fileStorageService;
        this.recipeService = recipeService;
    }

    @Override
    public void run(String ...args) throws Exception {

    }
}

