import React, {FC, useEffect, useState} from 'react';
import {IProfileStatusWithHooksProps} from "../../../types/types";

const ProfileStatusWithHooks: FC<IProfileStatusWithHooksProps> = ({status, updateStatus}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [newStatus, setNewStatus] = useState<string>(status)

    useEffect(() => {
            setNewStatus(status);
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(newStatus)
    }
    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }


    return (
        <b>
            {!editMode ? (
                <div>
                    <span onDoubleClick={activateEditMode}>{status || "------"}</span>
                </div>) : (
                <div>
                    <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}
                           value={newStatus} placeholder="Enter your status"/>
                </div>)}
        </b>
    )
}


export default ProfileStatusWithHooks;