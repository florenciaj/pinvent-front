import React, { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../Component/Card/Card';
import { forgotPasswordUser, validateEmail } from '../../Service/AuthService';
import styles from './Auth.module.scss';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const forgotPassword = (e) => {
        e.preventDefault();

        if (!email) {
            return toast.error('Email is required');
        }
        if (!validateEmail(email)) {
            return toast.error("Use a valid email");
        }

        const userData = {
            email
        };

        setIsLoading(true);
        forgotPasswordUser(userData);
        setEmail('');
        setIsLoading(false);
    };

    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <AiOutlineMail size={35} color='#999'></AiOutlineMail>
                    </div>
                    <h2>Forgot password</h2>

                    <form onSubmit={forgotPassword}>
                        <input type="email" placeholder='Email' name="email" required value={email} onChange={handleInputChange} />
                        <button type="submit" className='--btn --btn-primary --btn-block'>Get reset email</button>

                        <div className={styles.links}>
                            <p>
                                <Link to='/'>- Home</Link>
                            </p>
                            <p>
                                <Link to='/login'>- Login</Link>
                            </p>
                        </div>
                    </form>

                </div>
            </Card>
        </div>
    )
}

export default ForgotPassword