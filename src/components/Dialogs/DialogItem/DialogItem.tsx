import React, {FC} from 'react';
import classes from "./DialogItem.module.css";
import {IDialogItem} from "../../../types/types";

const DialogItem: FC<IDialogItem> = ({ava, name}) => {
    return (
        <div className={`${classes.dialog} ${classes.avatars}`}>
             <img src={ava} alt="logo"/> {name}
        </div>
    );
};

export default DialogItem;