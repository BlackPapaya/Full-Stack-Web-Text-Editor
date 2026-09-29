package com.example.web_app.controller;
import com.example.web_app.model.User;
import com.example.web_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.web_app.model.TextSaveDto;

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

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginUser) {
        User existingUser = userRepository.findByUsername(loginUser.getUsername());

        if (existingUser == null) {
            return ResponseEntity.badRequest().body("Benutzer nicht gefunden");
        }

        if (!existingUser.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.badRequest().body("Falsches Password");
        }

        System.out.println("Login erfolgreich für: " + existingUser.getUsername());
        return ResponseEntity.ok("Login erfolgreich");
    }

    // NEU: Text in der Datenbank für den spezifischen User speichern
    @PostMapping("/save-text")
    public ResponseEntity<String> saveText(@RequestBody TextSaveDto saveDto) {
        User user = userRepository.findByUsername(saveDto.getUsername());

        if (user == null) {
            return ResponseEntity.badRequest().body("User nicht gefunden!");
        }

        // Text aktualisieren
        user.setContent(saveDto.getContent());
        userRepository.save(user);

        System.out.println("Text erfolgreich gespeichert für User: " + user.getUsername());
        return ResponseEntity.ok("Text erfolgreich in SQLite gespeichert!");
    }
}


