import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import BusCard from "../components/BusCard";
import "./Buses.css";

const Buses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/buses/get")
      .then((res) => {
        setBuses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load buses.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="buses-container">
      <Container>
        <h2 className="section-title">Available Buses</h2>

        {loading && (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {!loading && !error && buses.length === 0 && (
          <p className="text-muted text-center">No buses available.</p>
        )}

        <Row className="bus-grid">
          {buses.map((bus) => (
            <Col xs={12} sm={6} lg={4} key={bus.id} className="bus-card-col mb-4">
              <BusCard bus={bus} showBook={user?.role === "CUSTOMER"} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Buses;
