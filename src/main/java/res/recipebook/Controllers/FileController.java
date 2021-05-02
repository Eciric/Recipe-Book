package res.recipebook.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import res.recipebook.Repositories.UserRepository;
import res.recipebook.Security.Services.UserDetailsImpl;
import res.recipebook.Services.FileStorageService;
import javax.servlet.http.HttpServletRequest;


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

    @PostMapping(value = "/testUpload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadFile(@RequestParam MultipartFile file, HttpServletRequest httpServletRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userRepository.existsById(userDetails.getId().intValue())) {

        }
        //        fileStorageService.storeFile(file);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
