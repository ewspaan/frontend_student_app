import React from 'react';
import styles from "../heading/Heading.module.css";

export const Heading = ({ level, children }) => {
    switch (level) {
        case 1:
            return <h1 className={styles.heading}>{children}</h1>
        case 2:
            return <h2 className={styles.heading}>{children}</h2>
        case 3:
            return <h3 className={styles.heading}>{children}</h3>
        case 4:
            return <h4 className={styles.heading}>{children}</h4>
        default:
            return children
    }
}
