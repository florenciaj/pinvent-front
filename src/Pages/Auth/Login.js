import React, { useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../Component/Card/Card';
import Loader from '../../Component/Loader/Loader';
import { SET_LOGIN, SET_NAME } from '../../Redux/Feature/Auth/Auth';
import { loginUser, validateEmail } from '../../Service/AuthService';
import styles from './Auth.module.scss';

const initialState = {
    email: '',
    password: ''
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { email, password } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const login = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error('All fields are required');
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }

        const userData = {
            email,
            password,
        };

        setIsLoading(true);

        try {
            const data = await loginUser(userData);

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
                        <BiLogIn size={35} color='#999'></BiLogIn>
                    </div>
                    <h2>Login</h2>

                    <form onSubmit={login}>
                        <input type="email" placeholder='Email' name="email" required value={email} onChange={handleInputChange} />
                        <input type="password" placeholder='Password' name="password" required value={password} onChange={handleInputChange} />
                        <button type="submit" className='--btn --btn-primary --btn-block'>Login</button>
                    </form>

                    <Link to='/forgot-password'>Forgot password</Link>

                    <span className={styles.register}>
                        <Link to='/'>Home</Link>
                        <p>&nbsp; Don't have an account? &nbsp;</p>
                        <Link to='/register'>Register</Link>
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default Login