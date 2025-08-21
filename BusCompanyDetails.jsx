import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Table,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./BusCompanyDetails.css";

const BusCompanyDetails = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNo: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchCompanies();
    }
  }, []);

  const fetchCompanies = () => {
    axios
      .get("http://localhost:8082/api/bus/Company/get")
      .then((res) => setCompanies(res.data))
      .catch(() => setError("Failed to load bus company data."));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, phoneNo, description } = formData;
    if (!name || !address || !phoneNo || !description) {
      setError("Please fill out all fields.");
      return;
    }

    const url = editId
      ? `http://localhost:8082/api/bus/Company/update/${editId}`
      : "http://localhost:8082/api/bus/Company/insert";
    const method = editId ? axios.put : axios.post;

    method(url, formData)
      .then(() => {
        setMessage(editId ? "Bus company updated!" : "Bus company added successfully!");
        setFormData({ name: "", address: "", phoneNo: "", description: "" });
        setEditId(null);
        fetchCompanies();
      })
      .catch(() => setError("Error occurred. Try again."));
  };

  const handleEdit = (company) => {
    setFormData({
      name: company.name,
      address: company.address,
      phoneNo: company.phoneNo,
      description: company.description,
    });
    setEditId(company.id);
    setMessage("");
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bus company?")) {
      axios
        .delete(`http://localhost:8082/api/bus/Company/delete/${id}`)
        .then(() => {
          setMessage("Bus company deleted successfully!");
          fetchCompanies();
        })
        .catch(() => {
          setError("Delete failed. Try again.");
        });
    }
  };

  return (
    <Container className="company-container mt-5">
      <h2 className="page-title">🚌 Bus Company Details</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* === Form (only visible for admin) === */}
      {user?.role === "ADMIN" && (
        <Form onSubmit={handleSubmit} className="company-form mb-4">
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sharma Travels"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Bus Stand Road, Pune"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="9876543210"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Leading bus operator with AC / Non-AC services..."
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button type="submit" className="btn-save">
              {editId ? "Update Bus Company" : "Add Bus Company"}
            </Button>
          </div>
        </Form>
      )}

      {/* === Table === */}
      <div className="table-wrapper">
        <Table bordered hover responsive className="company-table">
          <thead>
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Description</th>
              {user?.role === "ADMIN" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 ? (
              <tr>
                <td colSpan={user?.role === "ADMIN" ? 6 : 5} className="text-center">
                  No bus company data available.
                </td>
              </tr>
            ) : (
              companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.address}</td>
                  <td>{company.phoneNo}</td>
                  <td>{company.description}</td>
                  {user?.role === "ADMIN" && (
                    <td>
                      <Button size="sm" className="btn-edit me-2" onClick={() => handleEdit(company)}>
                        ✏️ Edit
                      </Button>
                      <Button size="sm" className="btn-delete" onClick={() => handleDelete(company.id)}>
                        🗑️ Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default BusCompanyDetails;
