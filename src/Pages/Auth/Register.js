import React, { useState } from 'react';
import { TiUserAddOutline } from 'react-icons/ti';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../Component/Card/Card';
import Loader from '../../Component/Loader/Loader';
import { SET_LOGIN, SET_NAME } from '../../Redux/Feature/Auth/Auth';
import { registerUser, validateEmail } from '../../Service/AuthService';
import styles from './Auth.module.scss';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, confirmPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };

    setIsLoading(true);

    try {
      const data = await registerUser(userData);

      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));

      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color='#999'></TiUserAddOutline>
          </div>
          <h2>Register</h2>

          <form onSubmit={register}>
            <input type="text" placeholder='Name' name="name" required value={name} onChange={handleInputChange} />
            <input type="email" placeholder='Email' name="email" required value={email} onChange={handleInputChange} />
            <input type="password" placeholder='Password' name="password" required value={password} onChange={handleInputChange} />
            <input type="password" placeholder='Confirm password' name="confirmPassword" required value={confirmPassword} onChange={handleInputChange} />
            <button type="submit" className='--btn --btn-primary --btn-block'>Register</button>
          </form>

          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p>&nbsp; Already have an account &nbsp;</p>
            <Link to='/login'>Login</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Register