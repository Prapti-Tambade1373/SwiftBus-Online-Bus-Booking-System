package com.Bus.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Bus.Model.Bus;
import com.Bus.Repository.BusRepository;


@Service
public class BusService {
	
	@Autowired
	private BusRepository busRepo;
	
	public Bus addBus(Bus bus) {
        return busRepo.save(bus);
    }

	public List<Bus> getAllBus() {
        return busRepo.findAll();
    }

	
	 public Bus updateBus(Long id, Bus newBus) {
			Bus busData =	busRepo.findById(id).orElse(null);
			if(busData !=null) {
			  return busRepo.save(newBus);
			}else {
				 throw new RuntimeException("User not found with id : " +  id);
			}
	 }

	
	
	 public void deleteBus(Long id) {
	        busRepo.deleteById(id);
	    }

	  
	 
}
