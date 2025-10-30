import React, {FC} from 'react';
import classes from "./Message.module.css";
import {IMessages} from "../../../types/types";

const Message: FC<IMessages> = ({message}) => {
    return (
        <div className={classes.message}>{message}</div>
    );
};

export default Message;