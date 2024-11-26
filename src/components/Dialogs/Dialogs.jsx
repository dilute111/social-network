import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogsElements =
        props.d.map(e => <DialogItem id={e.id} name={e.name}/>)
    let messagesElements =
        props.m.map(e => <Message message={e.message}/>)

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={classes.messages}>
                { messagesElements }
            </div>
        </div>

    );
};

export default Dialogs;