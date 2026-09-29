package com.example.web_app;

import com.example.web_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Boot schreibt die Datenbank-Befehle hierfür komplett automatisch!
    User findByUsername(String username);
}