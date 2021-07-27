import React from 'react';
import './node.scss';

const Node = props => {
    const { name, status, statusClick, nameClick } = props;

    const statusSymbol = {
        success: <i className={`bi bi-check-lg icon__light`}></i>,
        warning: <i className={`bi bi-exclamation-lg icon__dark`}></i>,
        failure: <i className={`bi bi-x-lg icon__light`}></i>
    }

    return (
        <div className="btn-group node" role="group" aria-label="Board">
            <button className={`btn node-button__${status}`} type="button" onClick={statusClick}>{statusSymbol[status]}</button>
            <button className={`btn node-content__${status}`} type="button" onClick={nameClick}>{name}</button>
        </div>
    )
}

export default Node;