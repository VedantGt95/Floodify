package com.hackathon.floodify_backend.Repository;

import com.hackathon.floodify_backend.Model.Markers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Markers,Integer> {
}
