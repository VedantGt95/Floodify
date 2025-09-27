package com.hackathon.floodify_backend.Repository;

import com.hackathon.floodify_backend.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users,Integer> {
    Optional<Users> findByEmail(String email);

    Optional<Users> findByUsername(String username);
}
