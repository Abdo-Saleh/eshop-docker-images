package com.cyran.tp.server.database;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.InputStream;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;


/**
 * Class initializing connection with firebase database
 *
 * @author Peter Spusta
 */
@Service
public class FBInitialize {

	/**
	 * Void- initializing connection with firebase database
	 *
	 * 
	 */
    @PostConstruct
    public void initialize() {
        try {
            InputStream is = 
                    Thread.currentThread().getContextClassLoader().getResourceAsStream("access-key.json");
            FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(GoogleCredentials.fromStream(is))
                    .setDatabaseUrl("https://cyran-backend.firebaseio.com").build();

            FirebaseApp.initializeApp(options);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}