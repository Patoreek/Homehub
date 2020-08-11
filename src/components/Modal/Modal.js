import React from 'react';

import classes from './Modal.module.scss';

const Modal = (props) => {
    return (
        <div className={classes.modalOverlay}>
            <div className={classes.modal}>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;