package res.recipebook.Services;

import lombok.Getter;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import res.recipebook.Models.User;
import res.recipebook.Payload.Responses.FileResponse;
import res.recipebook.Properties.FileStorageProperties;
import res.recipebook.Repositories.UserRepository;
import res.recipebook.Security.Services.UserDetailsImpl;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

@Service
@Getter
public class FileStorageService {
    private final Path fileStorageLocation;
    private final UserRepository userRepository;

    public FileStorageService(FileStorageProperties fileStorageProperties, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            System.out.println("Could not create a new directory");
        }
    }

    public String storeProfileImage(MultipartFile file, UserDetailsImpl userDetails) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        System.out.println("Filename: " + fileName);
        try {
            Path targetLocation = this.fileStorageLocation.resolve("users/" + userDetails.getId().toString() + userDetails.getUsername() + fileName);
            System.out.println("Target location: " + targetLocation);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return targetLocation.toString();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return "";
    }

    public FileResponse downloadProfileImage(UserDetailsImpl userDetails) throws IOException {
        Optional<User> userOptional = userRepository.findById(userDetails.getId().intValue());
        if (userOptional.isPresent()) {
            Path filePath = fileStorageLocation.resolve(userOptional.get().getPath_to_profile_pic()).normalize();

            return new FileResponse(new File(filePath.toString()), Files.readAllBytes(filePath));
        }
        return null;
    }
}
