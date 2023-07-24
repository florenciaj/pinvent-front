import React from 'react';
import { MdPassword } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Card from '../../Component/Card/Card';
import styles from './Auth.module.scss';

const ResetPassword = () => {
    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <MdPassword size={35} color='#999'></MdPassword>
                    </div>
                    <h2>Reset password</h2>

                    <form>
                        <input type="password" placeholder='New password' name="new-password" required />
                        <input type="password" placeholder='Confirm password' name="confirm-password" required />
                        <button type="submit" className='--btn --btn-primary --btn-block'>Reset password</button>

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

export default ResetPassword