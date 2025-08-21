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

import com.Bus.Model.BusCompany;
import com.Bus.Services.BusCompanyService;


@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/bus/Company")
public class BusCompanyController {

	@Autowired
    private BusCompanyService buscompanyServices;
	
	
	 // Add bus company
    @PostMapping("/insert")
    public BusCompany addBusCompanyDetails(@RequestBody BusCompany busCompany) {
        return buscompanyServices.addBusCompany(busCompany);
    }

    // Get All Hotels
    @GetMapping("/get")
    public List<BusCompany> getAllBusCompanyDetails() {
        return buscompanyServices.getAllBusCompany();
    }

  

    // Update Hotel by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<BusCompany> updateBusCompanyDetails(@PathVariable Long id, @RequestBody BusCompany buscompany) {
    	BusCompany updatebuscompany = buscompanyServices.updateBusCompany(id, buscompany);
        if (updatebuscompany != null) {
            return ResponseEntity.ok(updatebuscompany);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete Hotel by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBusCompany(@PathVariable Long id) {
    	buscompanyServices.deletebusCompany(id);
        return ResponseEntity.ok("Deleted room with ID: " + id);
    }
}
