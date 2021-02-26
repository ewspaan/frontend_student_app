import React from 'react';

export const PageHeader = ({ icon, title }) => (

        <div className="title-container">
            <img src={icon} alt={title} />
            <h1>{title}</h1>
        </div>
    );
