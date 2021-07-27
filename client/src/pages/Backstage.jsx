import React, { useState } from 'react';
import { DiffEditor } from "@monaco-editor/react";
import ArduinoInitialise from '../plugins/ArduinoInitialise';
import Node from '../components/Node'

import './backstage.scss';

const Backstage = props => {
    const { original, modified } = props;
    const [baud, setBaud] = useState(9600);
    const onChange = e => {
      setBaud(e.target.value);
    }
    const clickConnect = e => {
      e.preventDefault();
      ArduinoInitialise(baud);
    }
    
    return (
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Backstage</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <form onSubmit={clickConnect}>
                <input className="form-control btn-outline-secondary" type="text" onChange={onChange} id="baud" />
                <button type="submit" className="btn btn-sm btn-outline-secondary">Connect</button>
            </form>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>
            <Node name="Board 1" status="success" />
            <Node name="Board 1" status="warning" />
            <Node name="Board 1" status="failure" />
        </div>
    )
}

export default Backstage;