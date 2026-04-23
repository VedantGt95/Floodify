package com.hackathon.floodify_backend.Controller;

import com.hackathon.floodify_backend.Model.Markers;
import com.hackathon.floodify_backend.Service.MarkerService;
import jakarta.persistence.MapKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/markers")
public class MarkerController {

    @Autowired
    private MarkerService service;

    @GetMapping("/getmarker")
    public ResponseEntity<List<Markers>> getMarkers(){
        List<Markers> allmarkers = service.getMarkers();
        if(allmarkers.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }else{
            return ResponseEntity.ok(allmarkers);
        }
    }

    @PostMapping("/setmarker")
    public ResponseEntity<Markers> setMarker(@RequestBody Markers marker){
        Markers added = service.addMarker(marker);
        return ResponseEntity.status(HttpStatus.CREATED).body(added);
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<String> verifyMarker(@PathVariable int id){
        try{
            service.verifyMarker(id);
            return ResponseEntity.ok("Marker Verified");
        }catch(RuntimeException e){
            return ResponseEntity.badRequest().body("Unable to verify");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMarker(@PathVariable int id){
        try{
            service.deleteMarker(id);
            return ResponseEntity.ok("Marker Deleted Sucessfully");
        }catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
 }
