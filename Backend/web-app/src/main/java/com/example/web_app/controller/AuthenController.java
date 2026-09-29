package com.example.web_app;
import com.example.web_app.model.User;
import com.example.web_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.web_app.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class AuthenController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Prüfen, ob der Benutzername schon existiert
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Benutzername ist bereits vergeben!");
        }

        // Direkt in der SQLite-Datenbank speichern
        userRepository.save(user);

        System.out.println("Erfolgreich registriert und gespeichert: " + user.getUsername());
        return ResponseEntity.ok("Registrierung erfolgreich!");
    }
}


