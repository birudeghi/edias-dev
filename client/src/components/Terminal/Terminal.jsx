import React, { useEffect, useRef } from 'react';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';

import './terminal.scss';

const Terminal = () => {
    const xtermRef = useRef();
    useEffect(() => {
        const fitAddon = new FitAddon();
        xtermRef.current.terminal.loadAddon(fitAddon);
        fitAddon.fit();
        xtermRef.current.terminal.writeln('Hello, World!');
    });

    return (
        <XTerm className="terminal" options={{disableStdin: true}} ref={xtermRef} />
    )
}

export default Terminal;