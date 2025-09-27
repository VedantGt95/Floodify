package com.hackathon.floodify_backend.Service;

import com.hackathon.floodify_backend.Model.FloodMarker;
import com.hackathon.floodify_backend.Repository.FloodMarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FloodMarkerService {

    @Autowired
    private FloodMarkerRepository repo;

    // Anyone can view flood-prone areas
    public List<FloodMarker> getAllMarkers() {
        return repo.findAll();
    }

    // User can mark flood-prone areas
    public FloodMarker addMarker(FloodMarker marker) {
        marker.setStatus("PENDING"); // default
        return repo.save(marker);
    }

    // Admin can verify a marker
    public FloodMarker verifyMarker(int id) {
        FloodMarker marker = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Marker not found"));
        marker.setStatus("VERIFIED");
        return repo.save(marker);
    }

    // Admin can delete a marker
    public void deleteMarker(int id) {
        repo.deleteById(id);
    }
}
