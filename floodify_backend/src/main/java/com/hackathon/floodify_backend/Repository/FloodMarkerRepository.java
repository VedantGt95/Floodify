package com.hackathon.floodify_backend.Repository;

import com.hackathon.floodify_backend.Model.FloodMarker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FloodMarkerRepository extends JpaRepository<FloodMarker,Integer> {
}
