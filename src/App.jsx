import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserDashboard from "./pages/UserDashboard";
import RaiseComplaint from "./components/RaiseComplaint/RaiseComplaint";
import AdminLayout from "./pages/Admin/AdminLayout";
import DashboardOverview from "./pages/Admin/DashboardOverview";
import ManageComplaints from "./pages/Admin/ManageComplaints";
import AssignComplaints from "./pages/Admin/AssignComplaints";
import Departments from "./pages/Admin/Departments";
import Users from "./pages/Admin/Users";
import Analytics from "./pages/Admin/Analytics";

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

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="complaints" element={<ManageComplaints />} />
        <Route path="assign" element={<AssignComplaints />} />
        <Route path="departments" element={<Departments />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}

export default App;