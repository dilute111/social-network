import React from 'react';
import {beachImg} from "../../../App";
import classes from "./ProfileInfo.module.css"

const ProfileInfo = (props) => {
    return (
        <div>
            <div>
                <img src={beachImg} alt="logo"/>
            </div>
            <div className={classes.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
        ;
};

export default ProfileInfo;