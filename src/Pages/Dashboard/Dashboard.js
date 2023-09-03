import React from 'react';
import RedirectLoggedOut from '../../CustomHook/RedirectLoggedOut';

const Dashboard = () => {
    RedirectLoggedOut("/login");
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}

export default Dashboard