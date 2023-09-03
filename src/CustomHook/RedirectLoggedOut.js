import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SET_LOGIN } from '../Redux/Feature/Auth/Auth';
import { getLoginStatus } from '../Service/AuthService';

const RedirectLoggedOut = (path) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus();
            dispatch(SET_LOGIN(isLoggedIn));

            if (!isLoggedIn) {
                toast.info('Session expired. Please log in again.');
                navigate(path);
                return;
            }
        }
        redirectLoggedOutUser();
    }, [navigate, path, dispatch]);
}

export default RedirectLoggedOut