
import "./App.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Visualizations from "./Pages/Visualizations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visual" element={<Visualizations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
