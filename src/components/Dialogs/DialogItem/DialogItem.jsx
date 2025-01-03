import React from 'react';
import classes from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={`${classes.dialog} ${classes.avatars}`}>
             <img src={props.ava} alt="logo"/> {props.name}
        </div>
    );
};

export default DialogItem;