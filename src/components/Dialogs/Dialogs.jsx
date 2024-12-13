import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/messages-reducer";


const Dialogs = (props) => {
    let state = props.store.getState()

    let dialogsElements =
        state.messagesPage.d.map(e => <DialogItem id={e.id} name={e.name} ava={e.ava}/>)
    let messagesElements =
        state.messagesPage.m.map(e => <Message message={e.message}/>)
    let newMessageBody = state.messagesPage.newMessageBody;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }
    let onNewMessageChange = (e) => {
        let body = e.currentTarget.value
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={classes.messages}>
                <div>{ messagesElements }</div>
                <div>
                    <div><textarea value={newMessageBody}
                                   onChange={onNewMessageChange}
                                   placeholder="Enter your message"></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>

    );
};

export default Dialogs;