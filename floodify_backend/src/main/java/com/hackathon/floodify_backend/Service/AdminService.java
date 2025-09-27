package com.hackathon.floodify_backend.Service;

import com.hackathon.floodify_backend.Model.Admin;
import com.hackathon.floodify_backend.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repo;

    public Admin validateAdmin(String username, String password) {
        Admin admin = repo.findByUsername(username).orElse(null);
        if(admin != null && admin.getPassword().equals(password)){
            return admin;
        }
        return null;
    }
}
