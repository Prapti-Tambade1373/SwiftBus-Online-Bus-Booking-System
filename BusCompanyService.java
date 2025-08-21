package com.Bus.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Bus.Model.BusCompany;
import com.Bus.Repository.BusCompanyRepository;


@Service
public class BusCompanyService {

	@Autowired
	private BusCompanyRepository BusCompanyRepo;
	
	public BusCompany addBusCompany(BusCompany  busCompany) {
   	 return BusCompanyRepo.save(busCompany);
       
   }

   
   
   public List<BusCompany > getAllBusCompany() {
       return BusCompanyRepo.findAll();
   }

   
   public BusCompany  updateBusCompany(Long id, BusCompany  newbuscompany) {
	   BusCompany  hotel = BusCompanyRepo.findById(id).orElse(null);
		if(hotel !=null) {
		  return BusCompanyRepo.save(newbuscompany);
		}else {
			 throw new RuntimeException("User not found with id : " +  id);
		}
}

   public void deletebusCompany(Long id) {
	   BusCompanyRepo.deleteById(id);
   }

	
	
}
