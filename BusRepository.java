package com.Bus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Bus.Model.Bus;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
	
	

}
