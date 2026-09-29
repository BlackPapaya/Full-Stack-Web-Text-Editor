package com.example.web_app.model;

public class TextSaveDto {
    private String username;
    private String content;

    // 1. WICHTIG: Leerer Standard-Konstruktor!
    public TextSaveDto() {}

    // 2. Getter und Setter
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
}