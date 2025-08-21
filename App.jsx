import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import BusCompanyDetails from "./pages/BusCompanyDetails";
import Buses from "./pages/Buses";
import MyBookings from "./pages/MyBookings";
import BookBus from "./pages/BookBus";           // <-- import

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/company-details" element={<BusCompanyDetails />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/book/:busId" element={<BookBus />} />   {/* <-- added */}
      </Routes>
    </Router>
  );
};

export default App;
