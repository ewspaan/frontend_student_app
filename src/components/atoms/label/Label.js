import React from "react";

export const Label = ({  name,children }) => (
    <div>
        <label style={{ fontWeight: 600 }} htmlFor={name}>
            {children}
        </label>
    </div>
);
