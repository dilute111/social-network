import React, {useEffect, useState} from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {AddMessageStock} from "../common/FormsControls/FormsControls";


const Dialogs = ({messagesPage, isAuthorized, sendMessage}) => {
    const {m, d} = messagesPage
    const [avatar, setAvatar] = useState(null)

    useEffect({
        fetch()
    }, [])

    if (!isAuthorized) return <Navigate to={"/login"}/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {d.map(e => <DialogItem key={e.id} id={e.id} name={e.name} ava={e.ava}/>)}
            </div>
            <div className={classes.messages}>
                <div>{m.map(e => <Message key={e.id} message={e.message}/>)}</div>
            </div>
            <AddMessageForm sendMessage={sendMessage}/>
        </div>

    );
};

const AddMessageForm = ({sendMessage}) => {
    return (
        < AddMessageStock sendMessage={sendMessage}  />
    )
}

export default Dialogs;