package res.recipebook.Bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import res.recipebook.Models.ERole;
import res.recipebook.Repositories.RoleRepository;


@Component
public class BootstrapData implements CommandLineRunner {

    public final RoleRepository roleRepository;

    public BootstrapData(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String ...args) throws Exception {
//        System.out.println("Hello from CLR");
//
//        System.out.println(roleRepository.findByName(ERole.ROLE_USER));

    }
}

