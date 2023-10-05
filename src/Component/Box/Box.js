import React from 'react';
import './Box.scss';

const Box = ({ backgroundColor, title, count, icon }) => {
    return (
        <div className={`info-box ${backgroundColor}`}>
            <span className="info-icon --color-white">
                {icon}
            </span>
            <span className="info-text">
                <p>{title}</p>
                <h4>{count}</h4>
            </span>
        </div>
    )
}

export default Box