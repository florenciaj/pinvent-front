import React from 'react';
import { TiUserAddOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Card from '../../Component/Card/Card';
import styles from './Auth.module.scss';

const Register = () => {
    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <TiUserAddOutline size={35} color='#999'></TiUserAddOutline>
                    </div>
                    <h2>Register</h2>

                    <form>
                        <input type="text" placeholder='Name' name="name" required />
                        <input type="email" placeholder='Email' name="email" required />
                        <input type="password" placeholder='Password' name="password" required />
                        <input type="password" placeholder='Confirm password' name="confirm-password" required />
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