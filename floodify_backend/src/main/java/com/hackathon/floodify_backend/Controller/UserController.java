package com.hackathon.floodify_backend.Controller;

import com.hackathon.floodify_backend.Model.Users;
import com.hackathon.floodify_backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users loginRequest){
        Users user = service.validateUser(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );
        if(user != null){
            return ResponseEntity.ok(user);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Username and Password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Users user){
        String result = service.registerUser(user);

        if (result.contains("already exists")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

}
