package com.hackathon.floodify_backend.Service;

import com.hackathon.floodify_backend.Model.Users;
import com.hackathon.floodify_backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public String registerUser(Users user) {
        Optional<Users> existingUser = repo.findByEmail(user.getEmail());
        Optional<Users> existingUsername = repo.findByUsername(user.getUsername());
            if (existingUser.isPresent()) {
                return "User with email " + user.getEmail() + " already exists!";
            }
            if(existingUsername.isPresent()){
                return "User with username "+user.getUsername() +"already exists!";
            }
            repo.save(user);
            return "User registered successfully!";
    }

    public Users validateUser(String username, String password) {
        Users user = repo.findByUsername(username).orElse(null);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
