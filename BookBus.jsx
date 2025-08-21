import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Spinner, Alert, Card } from "react-bootstrap";
import "./BookBus.css";

const BookBus = () => {
  const { busId } = useParams();
  const [bus, setBus] = useState(null);
  const [formData, setFormData] = useState({
    travelDate: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/buses/get")
      .then((res) => {
        const selectedBus = res.data.find((b) => b.id === parseInt(busId));
        if (selectedBus) {
          setBus(selectedBus);
        } else {
          setMessage("Bus not found.");
        }
      })
      .catch(() => setMessage("Failed to load bus info"));
  }, [busId]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    try {
      const orderResponse = await axios.post(
        `http://localhost:8082/api/payment/create-order/${bus.price}`
      );
      const { id: order_id, amount, currency } = orderResponse.data;

      const options = {
        key: "rzp_test_wpi348bHMGMA3n",
        amount,
        currency,
        name: "SwiftBus",
        description: `Booking for ${bus.busNumber}`,
        order_id,
        handler: async function (response) {
          try {
            const bookingData = {
              bus: { id: bus.id },
              customer: { id: user.id },
              travelDate: formData.travelDate,
              totalAmount: bus.price,
              status: "BOOKED",
            };
            await axios.post("http://localhost:8082/api/busBooking/add/booking", bookingData);
            alert("Bus booked successfully!");
            navigate("/mybookings");
          } catch (err) {
            console.error(err);
            setMessage("Payment succeeded but booking failed.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setMessage("Failed to initiate payment.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.travelDate) {
      setMessage("Please select travel date.");
      return;
    }
    handlePayment();
  };

  if (!bus) return <Spinner animation="border" className="mt-5" />;

  return (
    <Container className="booking-container">
      <Card className="booking-card">
        <Card.Body>
          <h2 className="booking-title">Book Your Journey</h2>
          <p className="booking-subtitle">
            {bus.companyName} ({bus.busNumber}) - ₹{bus.price}
          </p>
          {message && <Alert variant="danger">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Travel Date</Form.Label>
              <Form.Control
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={(e) =>
                  setFormData({ ...formData, travelDate: e.target.value })
                }
                className="form-input"
              />
            </Form.Group>

            <Button type="submit" className="booking-btn w-100">
              Pay & Confirm Booking
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookBus;
