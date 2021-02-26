import React from 'react';
import { NavLink } from 'react-router-dom';

export const PageNavLink = ({ link, exact, children, onClick }) => (
    <li>
        <NavLink
            exact={exact}
            to={link}
            activeClassName="active"
            onClick={onClick}>
            {children}
        </NavLink>
    </li>
);
