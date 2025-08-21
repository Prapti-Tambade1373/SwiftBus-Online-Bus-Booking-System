package com.Bus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Bus.Model.BusCompany;

@Repository
public interface BusCompanyRepository extends JpaRepository<BusCompany, Long>{
	

}
