import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {AddMessageStock} from "../common/FormsControls/FormsControls";


const Dialogs = (props) => {
    const {messagesPage: state} = props

    if (!props.isAuthorized) return <Navigate to={"/login"}/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {state.d.map(e => <DialogItem id={e.id} name={e.name} ava={e.ava}/>)}
            </div>
            <div className={classes.messages}>
                <div>{state.m.map(e => <Message message={e.message}/>)}</div>
            </div>
            <AddMessageForm sendMessage={props.sendMessage}/>
        </div>

    );
};

const AddMessageForm = ({sendMessage}) => {
    return (
        < AddMessageStock sendMessage={sendMessage}  />
    )
}

export default Dialogs;