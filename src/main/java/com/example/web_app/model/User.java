package com.example.web_app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    // NEU: Das Feld für den Editor-Text (TEXT-Typ für längere Texte)
    @Column(columnDefinition = "TEXT")
    private String content;

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getter und Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    // NEU: Getter und Setter für den Content
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}