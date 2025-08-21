package com.Bus.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Bus.Model.BusBooking;
import com.Bus.Model.User;
import com.Bus.Repository.BookingRepository;

@Service
public class BookingService {

	@Autowired
	private BookingRepository bookingRepo;
	
	public BusBooking saveBooking(BusBooking booking) {
        return bookingRepo.save(booking);
    }

    public List<BusBooking> getBookingsByUser(User user) {
        return bookingRepo.findByCustomer(user);
    }

    public List<BusBooking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public void deleteBooking(Long id) {
        bookingRepo.deleteById(id);
    }
}
