package res.recipebook.Bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import res.recipebook.Models.User;
import res.recipebook.Repositories.UserRepository;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Component
public class BootstrapData implements CommandLineRunner {

    public final UserRepository userRepository;

    public BootstrapData(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String ...args) throws Exception {
        System.out.println("Hello from CLR");
        User user = new User(
                "TestUsername",
                "TestEmail@email.com",
                "123",
                Timestamp.valueOf(LocalDateTime.now())
        );

        userRepository.save(user);
        System.out.println(userRepository.findAll());
    }
}
