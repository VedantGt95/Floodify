package com.hackathon.floodify_backend.Service;

import com.hackathon.floodify_backend.Model.Markers;
import com.hackathon.floodify_backend.Repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarkerService {

    @Autowired
    private LocationRepository repo;

    public List<Markers> getMarkers() {
        return repo.findAll();
    }

    public Markers addMarker(Markers marker) {
        return repo.save(marker);
    }

    public void verifyMarker(int id) {
        Markers marker = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Marker not found with id: " + id));

        marker.setStatus("VERIFIED");  // update status
        repo.save(marker);
    }

    public void deleteMarker(int id) {
        if(repo.existsById(id)){
            repo.deleteById(id);
        }else{
            throw new RuntimeException("Not found with "+id);
        }
    }
}
