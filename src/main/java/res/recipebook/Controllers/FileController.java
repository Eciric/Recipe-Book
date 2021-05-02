package res.recipebook.Controllers;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import res.recipebook.Models.User;
import res.recipebook.Payload.Responses.FileResponse;
import res.recipebook.Repositories.UserRepository;
import res.recipebook.Security.Services.UserDetailsImpl;
import res.recipebook.Services.FileStorageService;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Optional;


@CrossOrigin(origins="*")
@RestController
@RequestMapping(path="/api/files")
public class FileController {

    private final FileStorageService fileStorageService;

    private final UserRepository userRepository;

    public FileController(FileStorageService fileStorageService, UserRepository userRepository) {
        this.fileStorageService = fileStorageService;
        this.userRepository = userRepository;
    }

    @SuppressWarnings("rawtypes")
    @PostMapping(value = "/uploadProfilePicture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadProfilePicture(@RequestParam MultipartFile file) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userRepository.existsById(userDetails.getId().intValue())) {
            String filepath = fileStorageService.storeProfileImage(file, userDetails);
            System.out.println("filepath: " + filepath);
            Optional<User> user = userRepository.findById(userDetails.getId().intValue());
            if (user.isPresent()) {
                System.out.println("User is present");
                User existingUser = user.get();
                existingUser.setPath_to_profile_pic(filepath);
                userRepository.save(existingUser);
            }
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/downloadProfilePicture")
    public ResponseEntity<FileResponse> downloadProfilePicture(HttpServletRequest request) throws IOException {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userRepository.existsById(userDetails.getId().intValue())) {
            FileResponse fileResponse = fileStorageService.downloadProfileImage(userDetails);
            return new ResponseEntity<>(fileResponse, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
