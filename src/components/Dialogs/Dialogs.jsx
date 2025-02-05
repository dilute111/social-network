import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form"


const Dialogs = (props) => {
    let state = props.messagesPage

    let dialogsElements =
        state.d.map(e => <DialogItem id={e.id} name={e.name} ava={e.ava}/>)
    let messagesElements =
        state.m.map(e => <Message message={e.message}/>)

    if (!props.isAuthorized) return <Navigate to={"/login"}/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageForm sendMessage={props.sendMessage}/>
        </div>

    );
};

const AddMessageForm = ({sendMessage}) => {
    const {register, handleSubmit, reset} = useForm();
    const onSubmit = (data) => {
        if (data.newMessage.trim()) {
            sendMessage(data.newMessage);
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea {...register("newMessage")} placeholder="Enter your message"></textarea>
            </div>
            <div>
                <button type="submit">Send</button>
            </div>
        </form>
    )
}

export default Dialogs;