package com.Bus.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Bus.Model.BusBooking;
import com.Bus.Model.User;

@Repository
public interface BookingRepository extends JpaRepository<BusBooking, Long> {

	List<BusBooking> findByCustomer(User customer);
}
