package com.Bus.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.Bus.Services.BusRazorpayService;
import com.razorpay.Order;

@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/payment")

public class BusRazorpayController {
	
	private BusRazorpayService razorpayService;
	
	@PostMapping("/create-order/{amount}")
    public String createOrder(@PathVariable double amount) {
        try {
            Order order = razorpayService.createOrder(amount);
            return order.toString(); // sends order_id, amount, currency to frontend
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to create Razorpay order";
        }
    }
	

}
