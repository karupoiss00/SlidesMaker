import React from 'react';
import styles from './Panel.module.css';

function Panel() {
    return (
        <div className={styles.panelBar}>
            <div className={styles.panelButton}>Presentation</div>
            <div className={styles.panelButton}>TextBoxes</div>
            <div className={styles.panelButton}>Shapes</div>
            <div className={styles.panelButton}>Pictures</div>
        </div>
    )
}

export {
    Panel,
}
