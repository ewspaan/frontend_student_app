import React from 'react';
import "../navigationBar/NavigationBar.css"

export const NavigationBar = ({ children }) => (
    <nav>
        <ul>
            {children}
        </ul>
    </nav>
);
