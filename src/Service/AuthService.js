import axios from 'axios';
import { toast } from 'react-toastify';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/register`, userData);

        if (response.statusText === 200) {
            toast.success("Registered");
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/login`, userData);
        toast.success("Welcome!");
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/user/logout`);
        toast.success("Bye!");
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

export const forgotPasswordUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/forgot-password`, userData);
        toast.success("Mail sent successfully");
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

export const resetPasswordUser = async (userData, resetToken) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/user/reset-password/${resetToken}`, userData);
        toast.success("Password changed successfully");
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/user/logged-in`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

export const getUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/user`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};
