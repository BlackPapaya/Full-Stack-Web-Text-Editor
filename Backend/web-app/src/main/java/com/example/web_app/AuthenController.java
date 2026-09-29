package com.example.web_app;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static tools.jackson.databind.util.ClassUtil.name;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class AuthenController{

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        String username = userDto.getUsername();
        String password = userDto.getPassword();

        System.out.println("Registrierungsversuch empfangen:");
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);

        return ResponseEntity.ok("Registrierung für " + username + " war erfolgreich");
    }

    //TODO:



}