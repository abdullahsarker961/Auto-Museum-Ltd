/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Latest from "./pages/Latest";
import Stock from "./pages/Stock";
import CarLoan from "./pages/CarLoan";
import ContactUs from "./pages/ContactUs";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import CarForm from "./pages/admin/CarForm";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="latest" element={<Latest />} />
          <Route path="stock" element={<Stock />} />
          <Route path="car-loan" element={<CarLoan />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="car/:id" element={<CarDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/add-car" 
          element={
            <ProtectedRoute>
              <CarForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/edit-car/:id" 
          element={
            <ProtectedRoute>
              <CarForm />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

