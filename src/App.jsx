import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Feedback from "./Feedback";
import Signup from "./Signup/Signup";
import SignIn from "./SignIn/Signin";
import Home from "./Home/Home";
import ProtectedRoute from "./protectedRoute";
import Admin from "./Admin/Admin";

function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
