import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:resetPassword" element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
