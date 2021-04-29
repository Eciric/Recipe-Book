package res.recipebook.Bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import res.recipebook.Models.ERole;
import res.recipebook.Repositories.RoleRepository;
import res.recipebook.Services.FileStorageService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Component
public class BootstrapData implements CommandLineRunner {

    public final RoleRepository roleRepository;
    public final FileStorageService fileStorageService;
    public BootstrapData(RoleRepository roleRepository, FileStorageService fileStorageService) {
        this.roleRepository = roleRepository;
        this.fileStorageService = fileStorageService;
    }

    @Override
    public void run(String ...args) throws Exception {
//        Path path = Paths.get(sample.txt");
//        String name = "sample.txt";
//        String originalFileName = "sample.txt";
//        String contentType = "text/plain";
//        byte[] content = null;
//        try {
//            content = Files.readAllBytes(path);
//        } catch (final IOException e) {
//            System.out.println(e.getMessage());
//        }
//        MultipartFile result = new MockMultipartFile(name,
//                originalFileName, contentType, content);
//
//        String filename = fileStorageService.storeFile(result);

    }
}

