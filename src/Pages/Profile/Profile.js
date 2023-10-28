import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../Component/Card/Card';
import { SpinnerImg } from '../../Component/Loader/Loader';
import RedirectLoggedOut from '../../CustomHook/RedirectLoggedOut';
import { SET_NAME, SET_USER } from '../../Redux/Feature/Auth/Auth';
import { getUser } from '../../Service/AuthService';
import "./Profile.scss";

const Profile = () => {
    RedirectLoggedOut('/login');
    const dispatch = useDispatch();

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function getUserData() {
            const data = await getUser();
            setProfile(data);
            setIsLoading(false);
            dispatch(SET_USER(data));
            dispatch(SET_NAME(data.name));
        }
        getUserData();
    }, [dispatch])

    return (
        <div className="profile --my2">
            {isLoading && <SpinnerImg />}
            <>
                {!isLoading && profile === null ? (
                    <p>Something went wrong. Reload page</p>
                ) : (
                    <Card cardClass={"card --flex-dir-column"}>
                        <span className="profile-photo">
                            <img src={profile?.photo} />
                        </span>
                        <span className="profile-data">
                            <p>
                                <b>Name: </b> {profile?.name}
                            </p>
                            <p>
                                <b>Email: </b> {profile?.email}
                            </p>
                            <p>
                                <b>Phone: </b> {profile?.phone}
                            </p>
                            <p>
                                <b>Bio: </b> {profile?.bio}
                            </p>
                            <div>
                                <Link to="/profile/edit"></Link>
                                <button className="--btn --btn-primary">Edit profile</button>
                            </div>
                        </span>
                    </Card>
                )}
            </>
        </div>
    )
}

export default Profile