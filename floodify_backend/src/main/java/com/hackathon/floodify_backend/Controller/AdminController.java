package com.hackathon.floodify_backend.Controller;

import com.hackathon.floodify_backend.Model.Admin;
import com.hackathon.floodify_backend.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin loginRequest){
        Admin admin = service.validateAdmin(loginRequest.getUsername(),
                loginRequest.getPassword());
        if(admin != null){
            return ResponseEntity.ok(admin);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Username and Password");
        }
    }

}
