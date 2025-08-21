package com.Bus.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Bus.Model.BusBooking;
import com.Bus.Model.User;
import com.Bus.Services.BookingService;
import com.Bus.Services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/busBooking")
public class BookingController {

	
	 @Autowired
	    private BookingService bookingService;

	    @Autowired
	    private UserService userService;

	    @PostMapping("/add/booking")
	    public BusBooking bookBus(@RequestBody BusBooking booking) {
	        return bookingService.saveBooking(booking);
	    }

	    @GetMapping("/user/{userId}")
	    public List<BusBooking> getUserBookings(@PathVariable Long userId) {
	        User user = userService.getUserById(userId);
	        return bookingService.getBookingsByUser(user);
	    }

	    @GetMapping("/get/booking")
	    public List<BusBooking> getAllBookings() {
	        return bookingService.getAllBookings();
	    }

	    @DeleteMapping("/delete/booking/{id}")
	    public void cancelBooking(@PathVariable Long id) {
	        bookingService.deleteBooking(id);
	    }

	    @GetMapping("/invoice/{id}")
	    public void generatePDF(@PathVariable Long id, HttpServletResponse response) throws IOException {
	        BusBooking booking = bookingService.getAllBookings().stream()
	                .filter(b -> b.getId().equals(id)).findFirst().orElse(null);

	        if (booking != null) {
	            response.setContentType("application/pdf");
	            response.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
	            PDFGeneratorBus.generateInvoice(response, booking);
	        }
	    }
	}

