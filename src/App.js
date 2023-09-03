import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./Component/Layout/Layout";
import Sidebar from "./Component/Sidebar/Sidebar";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import { SET_LOGIN } from './Redux/Feature/Auth/Auth';
import { getLoginStatus } from './Service/AuthService';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus(){
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:resetToken" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={
          <Sidebar>
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
