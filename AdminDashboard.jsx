import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Tabs,
  Tab,
  Table,
  Button,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";

const AdminDashboard = () => {
  const [buses, setBuses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showBusModal, setShowBusModal] = useState(false);
  const [editBus, setEditBus] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    busNumber: '',
    companyName: '',
    type: '',
    price: '',
    available: true,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBuses();
    fetchBookings();
    fetchCustomers();
  }, []);

  const fetchBuses = async () => {
    const res = await axios.get('http://localhost:8082/api/buses/get');
    setBuses(res.data);
  };

  // ✅ CORRECTED ENDPOINT FOR ALL BOOKINGS
  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:8082/api/busBooking/get/booking');
    setBookings(res.data);
  };

  const fetchCustomers = async () => {
    const res = await axios.get('http://localhost:8082/api/user/get/user');
    const customerList = res.data.filter((u) => u.role === 'CUSTOMER');
    setCustomers(customerList);
  };

  const handleEditBus = (bus) => {
    setEditBus(bus);
    setFormData({
      image: bus.image || '',
      busNumber: bus.busNumber,
      companyName: bus.companyName,
      type: bus.type,
      price: bus.price,
      available: bus.available,
    });
    setShowBusModal(true);
  };

  const handleDeleteBus = async (id) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      await axios.delete(`http://localhost:8082/api/buses/delete/${id}`);
      fetchBuses();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editBus) {
        await axios.put(
          `http://localhost:8082/api/buses/update/${editBus.id}`,
          formData
        );
        setMessage('Bus updated successfully.');
      } else {
        await axios.post('http://localhost:8082/api/buses/insert', formData);
        setMessage('Bus added successfully.');
      }
      setShowBusModal(false);
      setEditBus(null);
      setFormData({
        image: '',
        busNumber: '',
        companyName: '',
        type: '',
        price: '',
        available: true,
      });
      fetchBuses();
    } catch (err) {
      setMessage('Failed to save bus.');
    }
  };

  return (
    <Container className="mt-5 bg-white p-4 rounded shadow-sm">
      <h2 className="mb-4 border-bottom pb-2">🚌 Admin Dashboard</h2>
      {message && <Alert variant="info">{message}</Alert>}

      <Tabs defaultActiveKey="buses" className="mb-3" fill>
        {/* === BUSES === */}
        <Tab eventKey="buses" title="Manage Buses">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Bus List</h5>
            <Button variant="primary" onClick={() => setShowBusModal(true)}>
              + Add Bus
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Bus Number</th>
                <th>Company</th>
                <th>Type</th>
                <th>Price</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id}>
                  <td>{bus.id}</td>
                  <td>{bus.image ? <img src={bus.image} width="60" alt="" /> : 'N/A'}</td>
                  <td>{bus.busNumber}</td>
                  <td>{bus.companyName}</td>
                  <td>{bus.type}</td>
                  <td>₹{bus.price}</td>
                  <td>{bus.available ? 'Yes' : 'No'}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => handleEditBus(bus)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDeleteBus(bus.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* === BOOKINGS === */}
        <Tab eventKey="bookings" title="All Bookings">
          <h5 className="mt-3 mb-3">Booking History</h5>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Bus</th>
                <th>Travel Date</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={b.id}>
                  <td>{index + 1}</td>
                  <td>{b.customer.name}</td>
                  <td>{b.bus.busNumber}</td>
                  <td>{b.travelDate}</td>
                  <td>₹{b.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* === CUSTOMERS === */}
        <Tab eventKey="customers" title="Customers">
          <h5 className="mt-3 mb-3">Registered Customers</h5>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      {/* === Add/Edit Bus Modal === */}
      <Modal show={showBusModal} onHide={() => setShowBusModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editBus ? "Edit Bus" : "Add Bus"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bus Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.busNumber}
                onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">-- Select Type --</option>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
                <option value="Sleeper">Sleeper</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Available"
                checked={formData.available}
                onChange={(e) =>
                  setFormData({ ...formData, available: e.target.checked })
                }
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              {editBus ? "Update Bus" : "Add Bus"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
