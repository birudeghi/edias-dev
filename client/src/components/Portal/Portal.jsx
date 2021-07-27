import React, { useState, useRef, useEffect } from 'react';
import Terminal from "../Terminal";
import { openSerial, closeSerial } from '../../utils/serial';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';
import "./portal.scss";
import { CONNECT_STATE } from "../../utils/constants";
import { useQuery, gql } from '@apollo/client';

export const QUERY = gql`
        query getConnected {
            isConnected @client
        }
    `;

const Portal = props => {
    const { status, port } = props;
    const [baud, setBaud] = useState(9600);
    const [input, setInput] = useState('');
    const { loading, error, data } = useQuery(QUERY);
    const [connectState, setConnectState] = useState(false);
    const xtermRef = useRef();

    useEffect(() => {
        const fitAddon = new FitAddon();
        xtermRef.current.terminal.loadAddon(fitAddon);
        fitAddon.fit();
        xtermRef.current.terminal.writeln('Hello, World!');
    }, []);

    function handleInitialise(e) {
        e.preventDefault();
        if (connectState === false) {
            openSerial(port).then(
                value => {
                    setConnectState(value);
                    port.on('data', function(data) {
                        let utf8decoder = new TextDecoder();
                        console.log('data received: ' + data);
                        xtermRef.current.terminal.write(data);
                    });
                }
                // can also add handleReject value function like the above
            );
        } else {
            closeSerial(port);//close port
        }
    }

    const handleSend = e => {
        e.preventDefault();
        const encoder = new TextEncoder();
        console.log(typeof input.toString());
        if (typeof input.toString() === 'string') {
            port.writer.write(Buffer.from(input.toString(), null));
        }
        
    }

    return (
        <React.Fragment>
            <div className="connect--container">
                <form className="connect--init" onSubmit={handleInitialise}>
                    <div className="row connect--input-row">
                        <label for="baud" className="col-sm-4 col-form-label">Baud rate</label>
                        <div className="baud-input-container col-sm-8">
                            <input className="baud-input" type="number" id="baud" onChange={setBaud} placeholder="Default is 9600" />
                        </div>
                    </div>
                    <div className="row connect--connect-switch form-check form-switch">
                        <button
                            className="connect--connect-switch-input btn btn-primary" 
                            type="submit" 
                            id="flexSwitchCheckDefault">{connectState ? "Disconnect" : "Connect"}</button>
                        <label className="connect--connect-switch-label form-check-label" for="flexSwitchCheckDefault">{connectState ? "Connected" : "Not connected"}</label>
                    </div>
                </form>
                <form className="input--init" onSubmit={handleSend}>
                    <div className="row input--row">
                        <input className="input--text" type="text" id="input" onChange={setInput} />
                        <button className="input--send-button btn btn-primary" type="submit" id="input">Send</button>
                    </div>
                </form>
                <div className="row flex-row justify-content-center">
                    <div className="col col-sm-4">
                        <XTerm className="terminal" options={{disableStdin: true}} ref={xtermRef} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Portal;