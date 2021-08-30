import React, { useState, useRef, useEffect } from 'react';
import { Buffer } from 'buffer';
import Terminal from "../Terminal";
// import { openSerial, closeSerial, readSerial } from '../../utils/serial';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';
import "./portal.scss";
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
    const [newline, setNewline] = useState(false);
    const { loading, error, data } = useQuery(QUERY);
    const [connectState, setConnectState] = useState(false);
    const xtermRef = useRef();

    useEffect(() => {
        const fitAddon = new FitAddon();
        xtermRef.current.terminal.loadAddon(fitAddon);
        fitAddon.fit();
        xtermRef.current.terminal.writeln('Hello, World!');
    }, []);

    function handleBaud(e) {
        setBaud(e.target.value);
    }

    function handleInput(e) {
        setInput(e.target.value);
    }

    function handleNewline(e) {
        setNewline(!newline);
    }

    function handleInitialise(e) {
        e.preventDefault();
        port.setBaud(baud);
        port.setupSerial();
        if (connectState === false) {
            port.openSerial().then(
                value => {
                    setConnectState(value);
                    port.serial.on('data', function(data) {
                        xtermRef.current.terminal.write(data.toString().replace(/\r\n/g, '\n').replace(/\n/g, '\r\n'));
                    });
                }
                // can also add handleReject value function like the above
            );
        } else {
            port.closeSerial(port);//close port
        }
    }

    async function handleSend(e) {
        e.preventDefault();
        let data = input;
        if (newline === true) {
            data = `${data}${newline ? '\n' : ''}`;
        }
        const buff = Buffer.from(data);
        await port.serial.write(buff, function(error) {
            if (error) {
                console.log(error)
            }
        });
    }

    return (
        <React.Fragment>
            <div className="connect--container">
                <form className="connect--init" onSubmit={handleInitialise}>
                    <div className="row connect--input-row">
                        <label for="baud" className="col-sm-4 col-form-label">Baud rate</label>
                        <div className="baud-input-container col-sm-8">
                            <input className="baud-input" type="number" id="baud" onChange={handleBaud} placeholder="Default is 9600" />
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
                    <div className="form-check form-switch">
                        <input className="form-check-input input--newline_input" type="checkbox" id="newlineSwitch" onClick={handleNewline} />
                        <label className="form-check-label input--newline_label" for="newlineSwitch">Newline</label>
                    </div>
                    <div className="row input--row">
                        <input className="input--text" type="text" id="input" onChange={handleInput} />
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