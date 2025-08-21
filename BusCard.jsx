import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BusCard = ({ bus, showBook }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/book/${bus.id}`);
  };

  return (
    <Card className="shadow-sm h-100">
      {bus.image && (
        <Card.Img
          variant="top"
          src={bus.image}
          alt={bus.busNumber}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <Card.Body>
        <Card.Title>{bus.companyName} ({bus.busNumber})</Card.Title>
        <Card.Text>
          Type: {bus.type} <br />
          ₹{bus.price} / per seat
        </Card.Text>
        {showBook && bus.available && (
          <Button className="book-btn" onClick={handleBookNow}>
            Book Now
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default BusCard;
