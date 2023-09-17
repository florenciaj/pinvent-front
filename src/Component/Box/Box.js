import React from 'react';
import './Box.scss';

const Box = ({ backgroundColor, title, quantity, icon }) => {
    return (
        <div className={`info-box ${backgroundColor}`}>
            <span className="info-icon --color-white">
                {icon}
            </span>
            <span className="info-text">
                <p>{title}</p>
                <h4>{quantity}</h4>
            </span>
        </div>
    )
}

export default Box