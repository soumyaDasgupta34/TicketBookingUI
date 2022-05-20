import Home from "./components/Home";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyBookings from "./components/MyBookings";
import BookTickets from "./components/BookTickets";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import { useAppSelector } from "./redux/hooks";
import ProtectedRoute from "./auth/ProtectedRoute";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <NavBar authentication={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute token={token}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookTickets/:bid"
          element={
            <ProtectedRoute token={token}>
              <BookTickets />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
