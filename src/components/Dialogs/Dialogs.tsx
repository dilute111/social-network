import React, {FC} from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {AddMessageStock} from "../common/FormsControls/FormsControls";
import {IDialogsOwnProps} from "../../types/types";


const Dialogs: FC<IDialogsOwnProps> = ({messagesPage, isAuthorized, sendMessage}) => {
    const {m, d} = messagesPage


    if (!isAuthorized) return <Navigate to={"/login"}/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {d.map(e => <DialogItem key={e.id} id={e.id} name={e.name} ava={`https://i.pravatar.cc/150?u=${e.id}`}/>)}
            </div>
            <div className={classes.messages}>
                <div>{m.map(e => <Message key={e.id} id={e.id} message={e.message}/>)}</div>
            </div>
            <AddMessageForm sendMessage={sendMessage}/>
        </div>

    );
};

const AddMessageForm: FC<{sendMessage: (messageText: string) => void}> = ({sendMessage}) => {
    return (
        < AddMessageStock sendMessage={sendMessage}  />
    )
}

export default Dialogs;