import React from 'react';
import '../css/style.css'

const AlertNotification = (props) => {
    return (
        <div className="alert">
            <span className="alertclosebtn" onClick={() => props.onClick()}>&times;</span>{props.errors}
        </div>

    )
}

export default AlertNotification;