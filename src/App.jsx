import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserDashboard from "./pages/UserDashboard";
import RaiseComplaint from "./components/RaiseComplaint/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import AdminLayout from "./pages/Admin/AdminLayout";
import DashboardOverview from "./pages/Admin/DashboardOverview";
import ManageComplaints from "./pages/Admin/ManageComplaints";
import AssignComplaints from "./pages/Admin/AssignComplaints";
import Users from "./pages/Admin/Users";
import Analytics from "./pages/Admin/Analytics";
import OfficerLayout from "./pages/Officer/OfficerLayout";
import OfficerDashboard from "./pages/Officer/OfficerDashboard";
import OfficerComplaints from "./pages/Officer/OfficerComplaints";

function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/raise-complaint" element={<RaiseComplaint />} />
      <Route path="/my-complaints" element={<MyComplaints />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="complaints" element={<ManageComplaints />} />
        <Route path="assign" element={<AssignComplaints />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* Officer Routes */}
      <Route path="/officer" element={<OfficerLayout />}>
        <Route path="dashboard" element={<OfficerDashboard />} />
        <Route path="complaints" element={<OfficerComplaints />} />
        {/* Placeholder for others */}
        <Route path="resolved" element={<OfficerComplaints />} /> 
        <Route path="profile" element={<OfficerDashboard />} />
        <Route path="settings" element={<OfficerDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;