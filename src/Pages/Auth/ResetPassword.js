import React, { useState } from 'react';
import { MdPassword } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../Component/Card/Card';
import { resetPasswordUser } from '../../Service/AuthService';
import styles from './Auth.module.scss';

const initialState = {
    newPassword: '',
    confirmPassword: '',
}

const ResetPassword = () => {
    const [formData, setFormData] = useState(initialState);
    const { newPassword, confirmPassword } = formData;
    const { resetToken } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const reset = async (e) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            return toast.error("Passwords must be up to 6 characters");
        }
        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        const userData = {
            newPassword,
            confirmPassword,
        };

        try {
            const data = await resetPasswordUser(userData, resetToken);
            toast.success(data.message);
        } catch (error) {
            toast.error('Could not reset password');
        }
    };

    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <MdPassword size={35} color='#999'></MdPassword>
                    </div>
                    <h2>Reset password</h2>

                    <form onSubmit={reset}>
                        <input type="password" placeholder='New password' name="newPassword" required value={newPassword} onChange={handleInputChange} />
                        <input type="password" placeholder='Confirm password' name="confirmPassword" required value={confirmPassword} onChange={handleInputChange} />
                        <button type="submit" className='--btn --btn-primary --btn-block'>Reset password</button>

                        <div className={styles.links}>
                            <p>
                                <Link to='/'>Home</Link>
                            </p>
                            <p>
                                <Link to='/login'>Login</Link>
                            </p>
                        </div>
                    </form>

                </div>
            </Card>
        </div>
    )
}

export default ResetPassword