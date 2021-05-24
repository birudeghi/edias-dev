import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import feather from '../images/feather-sprite.svg';
import './dashboard.scss';


const Dashboard = props => {
    const { children } = props;
    const [projectName, setProjectName] = useState("New Project");

    return (
        <>
            <Helmet>
                <title>Edias</title>
                <meta name="description" content="Quickly test and seamlessly integrate hardware modules." />
            </Helmet>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">{projectName}</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                <a className="nav-link" href="#">Sign out</a>
                </li>
            </ul>
            </header>

            <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">
                        <svg className="feather home-icon" fill="currentColor">
                            <use href={feather + "#home"} />
                        </svg>
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/backstage">
                        <svg className="feather home-icon" fill="currentColor">
                            <use href={feather + "#code"} />
                        </svg>
                            Backstage
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <svg className="feather home-icon" fill="currentColor">
                            <use href={feather + "#grid"} />
                        </svg>
                            Variables
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <svg className="feather home-icon" fill="currentColor">
                            <use href={feather + "#clipboard"} />
                        </svg>
                            Logs
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <svg className="feather home-icon" fill="currentColor">
                            <use href={feather + "#eye"} />
                        </svg>
                            Watcher
                        </a>
                    </li>
                    </ul>
                </div>
                </nav>         
                    {children}
            </div>
            </div>
            
        </>
    )
}

export default Dashboard