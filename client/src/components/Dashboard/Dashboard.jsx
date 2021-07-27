import React, { useEffect, useState } from 'react';
import "./dashboard.scss";


const Dashboard = props => {
    const { children } = props;
    return (
        <React.Fragment>
            <nav className="navbar edias-navbar">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        edias
                    </a>
                </div>
            </nav>
            {children}
        </React.Fragment>    
    )
}

export default Dashboard