import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN } from '../../Redux/Feature/Auth/Auth';
import { logoutUser } from '../../Service/AuthService';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        await logoutUser();
        setIsLoading(true);
        dispatch(SET_LOGIN(false));
        navigate("/login");
        setIsLoading(false);
    };

    return (
        <div className='--pad header'>
            <div className="--flex-between">
                <h3>
                    <span className='--fw-thin'>Welcome, </span>
                    <span className='--color-danger'>Human</span>
                </h3>

                <button className="--btn --btn-danger" onClick={logout}>Logout</button>
            </div>
            <hr />
        </div>
    )
}

export default Header