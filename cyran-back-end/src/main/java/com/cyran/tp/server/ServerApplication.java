package com.cyran.tp.server;

import com.cyran.tp.server.priviledges.Priviledges;
import com.cyran.tp.server.priviledges.PriviledgesRepository;
import com.cyran.tp.server.users.Users;
import com.cyran.tp.server.users.UsersRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Example;

/**
 * Main point when spring starts
 *
 * @author Peter Spusta
 */
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ServerApplication {

    @Autowired
    private PriviledgesRepository priviledgesRepository;

    @Autowired
    private UsersRepository usersRepository;

    // TODO: use spring.datasource.data property and reference sequence values manually
    @Bean
    InitializingBean createUserTypes() {
        return () -> {
			try {
				Priviledges admin = new Priviledges();
				Priviledges assistant = new Priviledges();
				Priviledges user = new Priviledges();
				user.setPriviledge("user");
				assistant.setPriviledge("assistant");
				admin.setPriviledge("admin");
				if(!priviledgesRepository.exists(Example.of(user))){
					priviledgesRepository.save(user);
				}
				if(!priviledgesRepository.exists(Example.of(assistant))){
					priviledgesRepository.save(assistant);
				}
				if(!priviledgesRepository.exists(Example.of(admin))){
					priviledgesRepository.save(admin);
				}
				Users user1 = new Users();
				user1.setRole(priviledgesRepository.findPriviledgeByName("user"));
				user1.setName("Jan");
				user1.setEmail("jan@stuba.sk");
				user1.setPassword("nonHashed1");
				if(!usersRepository.exists(Example.of(user1))){
					usersRepository.save(user1);
				}
				Users assistant1 = new Users();
				assistant1.setRole(priviledgesRepository.findPriviledgeByName("assistant"));
				assistant1.setName("user");
				assistant1.setEmail("user@user.sk");
				assistant1.setPassword("$2a$10$vZZB6gMeXs2O6WCLUAw.BOskBXdlqPa0F.1e7fzYxksofswQCcOSa");
				if(!usersRepository.exists(Example.of(assistant1))){
					usersRepository.save(assistant1);
				}
				Users admin1 = new Users();
				admin1.setRole(priviledgesRepository.findPriviledgeByName("admin"));
				admin1.setName("admin");
				admin1.setEmail("admin@topsecret.com");
				admin1.setPassword("nopointtobreak");
				if(!usersRepository.exists(Example.of(admin1))){
					usersRepository.save(admin1);
				}
			} catch(Exception e){
				System.out.println("Cannot innitialize DB! DB is probably initialized. Please delete its content for new start of a game!");
			}
        };
    }


    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

}
