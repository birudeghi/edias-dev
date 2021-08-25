import React , { useState } from 'react';
import { newSerial } from '../utils/serial';
import Portal from "../components/Portal";
import PortalSerial from "../utils/serial";
import ArduinoInitialise from "../plugins/ArduinoInitialise";

import "./main.scss";

const serial1 = new PortalSerial();

const Main = () => {
    const [connect, setConnect] = useState(false);
    
    return (
        <div className="main-page">
            <div className="row flex-row justify-content-center">
                <div className="col col-sm-4">
                    <Portal port={serial1} />
                </div>
            </div>
        </div>
    )
}

export default Main;