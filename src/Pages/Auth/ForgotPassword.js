import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Card from '../../Component/Card/Card';
import styles from './Auth.module.scss';

const ForgotPassword = () => {
    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <AiOutlineMail size={35} color='#999'></AiOutlineMail>
                    </div>
                    <h2>Forgot password</h2>

                    <form>
                        <input type="email" placeholder='Email' name="email" required />
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