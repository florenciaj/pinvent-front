import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../Redux/Feature/Auth/Auth";

export const ShowOnLogin = ({ children }) => {
    const isLogged = useSelector(selectIsLoggedIn);
    if (isLogged) {
        return <>{ children }</>;
    } else {
        return null;
    }
};

export const ShowOnLogout = ({ children }) => {
    const isLogged = useSelector(selectIsLoggedIn);
    if (!isLogged) {
        return <>{ children }</>;
    } else {
        return null;
    }
};