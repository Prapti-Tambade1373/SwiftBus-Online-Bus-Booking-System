package com.Bus.Model;

import java.time.LocalDate;
import javax.persistence.*;

@Entity
public class BusBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate travelDate;
    private double totalAmount;
    private String status; // BOOKED, CANCELLED

    @ManyToOne
    private User customer;

    @ManyToOne
    private Bus bus;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getTravelDate() {
        return travelDate;
    }
    public void setTravelDate(LocalDate travelDate) {
        this.travelDate = travelDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public User getCustomer() {
        return customer;
    }
    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public Bus getBus() {
        return bus;
    }
    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public BusBooking() {
        super();
    }

    @Override
    public String toString() {
        return "BusBooking [id=" + id + ", travelDate=" + travelDate + ", totalAmount=" + totalAmount +
                ", status=" + status + ", customer=" + customer + ", bus=" + bus + "]";
    }
}
