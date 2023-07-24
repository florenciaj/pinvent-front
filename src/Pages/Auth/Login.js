import React from 'react';
import { BiLogIn } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Card from '../../Component/Card/Card';
import styles from './Auth.module.scss';

const Login = () => {
    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <BiLogIn size={35} color='#999'></BiLogIn>
                    </div>
                    <h2>Login</h2>

                    <form>
                        <input type="email" placeholder='Email' name="email" required />
                        <input type="password" placeholder='Password' name="password" required />
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