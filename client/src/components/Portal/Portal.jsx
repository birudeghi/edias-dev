import React, { useState, useRef, useEffect } from 'react';
import { Buffer } from 'buffer';
import Terminal from "../Terminal";
import { openSerial, closeSerial, readSerial } from '../../utils/serial';
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
                    // readSerial(port).then(data => {
                    //     xtermRef.current.terminal.write(data.toString());
                    // }
                    // )
                }
                // can also add handleReject value function like the above
            );
        } else {
            closeSerial(port);//close port
        }
    }

    async function handleSend(e) {
        e.preventDefault();
        const buff = Buffer.from(input);
        // const data = new Uint8Array(buff);
        console.log(buff);
        if (typeof input === 'string') {
            await port.write(buff, function(error) {
                if (error) {
                    console.log(error)
                }
            });
        }
        
    }

    return (
        <React.Fragment>
            <div className="connect--container">
                <form className="connect--init" onSubmit={handleInitialise}>
                    <div className="row connect--input-row">
                        <label for="baud" className="col-sm-4 col-form-label">Baud rate</label>
                        <div className="baud-input-container col-sm-8">
                            <input className="baud-input" type="number" id="baud" onChange={e => setBaud(e.target.value)} placeholder="Default is 9600" />
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
                        <input className="input--text" type="text" id="input" onChange={e => setInput(e.target.value)} />
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