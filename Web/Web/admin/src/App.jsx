import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import UserManagement from "./components/pages/User/UserManagement";
import VehicleManagement from "./components/pages/Vehicle/VehicleManagement";
import "./App.css";
import DriverManagement from "./components/pages/Driver/DriverManagement";
import AdminsManagement from "./components/pages/Admin/AdminsManagement";
import NotificationManagement from "./components/pages/Notification/NotificationManagement";
import LoginForm from "./components/pages/Login/Loginform";
import PrivateRoute from "./components/routes/PrivateRoute"; // ✅
import RideManagement from "./components/pages/Ride/RideManagement";
import RideReport from "./components/pages/RideReport/RideReport";
import HeaderBar from "./components/Header/HeaderBar";
import AssignmentForm from "./components/pages/AssignmentManagement/AssignmentForm";
import AssignmentList from "./components/pages/AssignmentManagement/AssignmentList";
import VehicleStatusManagement from "./components/pages/Vehicle/VehicleStatusManagement";
import VehicleInfoManagement from "./components/pages/Vehicle/VehicleInfoManagement";
import PaymentManagement from "./components/pages/Payment/PaymentManagement";
import PaymentDashboard from "./components/pages/Payment/PaymentDashboard";
function App() {
  const [setSelectedItem] = useState("users");

  return (
    <Router>
      <div className="app-container">
        <HeaderBar />
        <div className="main-layout">
          <Sidebar setSelectedItem={setSelectedItem} />
          <div className="content">
            <Routes>
              <Route path="/login" element={<LoginForm />} />

              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <UserManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vehicles"
                element={
                  <PrivateRoute>
                    <VehicleManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vehicles/info"
                element={
                  <PrivateRoute>
                    <VehicleInfoManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vehicles/status"
                element={
                  <PrivateRoute>
                    <VehicleStatusManagement />
                  </PrivateRoute>
                }
              />

              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <UserManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/drivers"
                element={
                  <PrivateRoute>
                    <DriverManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vehicledriver"
                element={
                  <PrivateRoute>
                    <AssignmentForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/assignment-list"
                element={
                  <PrivateRoute>
                    <AssignmentList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Admins"
                element={
                  <PrivateRoute>
                    <AdminsManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Notifications"
                element={
                  <PrivateRoute>
                    <NotificationManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Rides"
                element={
                  <PrivateRoute>
                    <RideManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ride-report"
                element={
                  <PrivateRoute>
                    <RideReport />
                  </PrivateRoute>
                }
              />
              <Route
                path="/payments"
                element={
                  <PrivateRoute>
                    <PaymentManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/payment-dashboard"
                element={
                  <PrivateRoute>
                    <PaymentDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>


          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;