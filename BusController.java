package com.Bus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Bus.Model.Bus;
import com.Bus.Services.BusService;



@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/buses")
public class BusController {
    
	@Autowired
	public BusService busservices;
	
	  // Add Bus
    @PostMapping("/insert")
    public Bus addBusDetails(@RequestBody Bus bus) {
        return busservices.addBus(bus);
    }
    
    
 // Get All Bus
    @GetMapping("/get")
    public List<Bus> getAllBusDetails() {
        return busservices.getAllBus();
    }
    
    
    // Update Bus by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Bus> updateBusDetails(@PathVariable Long id, @RequestBody Bus bus) {
        Bus updatedBus = busservices.updateBus(id, bus);
        if (updatedBus != null) {
            return ResponseEntity.ok(updatedBus);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    // Delete Room by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBus(@PathVariable Long id) {
        busservices.deleteBus(id);
        return ResponseEntity.ok("Deleted Bus with ID: " + id);
    }
    
}
