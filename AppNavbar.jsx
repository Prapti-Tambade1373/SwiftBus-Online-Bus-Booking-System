import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const AppNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🚍 SwiftBus
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="swift-navbar" />
        <Navbar.Collapse id="swift-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-item-link">
              Home
            </Nav.Link>

            {user?.role === "CUSTOMER" && (
              <>
                <Nav.Link as={Link} to="/buses" className="nav-item-link">
                  Buses
                </Nav.Link>
                <Nav.Link as={Link} to="/mybookings" className="nav-item-link">
                  My Bookings
                </Nav.Link>
              </>
            )}

            {user?.role === "ADMIN" && (
              <>
                <Nav.Link as={Link} to="/admin/dashboard" className="nav-item-link">
                  Admin Dashboard
                </Nav.Link>
              </>
            )}

            {/* All logged-in users can view Bus Companies */}
            {user && (
              <Nav.Link as={Link} to="/company-details" className="nav-item-link">
                Bus Companies
              </Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto align-items-center">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" className="nav-item-link">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-item-link">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Navbar.Text className="text-white me-3">
                  Welcome, <strong>{user.name}</strong> ({user.role})
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
