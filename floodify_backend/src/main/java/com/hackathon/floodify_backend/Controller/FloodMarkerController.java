package com.hackathon.floodify_backend.Controller;

import com.hackathon.floodify_backend.Model.FloodMarker;
import com.hackathon.floodify_backend.Service.FloodMarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/flood")
public class FloodMarkerController {

    @Autowired
    private FloodMarkerService service;

    @GetMapping("/areas")
    public ResponseEntity<List<FloodMarker>> getFloodAreas(){
        List<FloodMarker> markers = service.getAllMarkers();
        if(markers.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(markers);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<FloodMarker> markFloodArea(@RequestBody FloodMarker marker){
        FloodMarker added = service.addMarker(marker);
        return ResponseEntity.status(HttpStatus.CREATED).body(added);
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<FloodMarker> verifyFloodMarker(@PathVariable int id){
        FloodMarker verified = service.verifyMarker(id);
        return ResponseEntity.ok(verified);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFloodArea(@PathVariable int id) {
        service.deleteMarker(id);
        return ResponseEntity.noContent().build();
    }
}
