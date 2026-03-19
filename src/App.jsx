import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

// (Create these pages later)
const Login = () => <h1>Login Page</h1>;
const Register = () => <h1>Register Page</h1>;

function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}

export default App;