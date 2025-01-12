import React from 'react';
import {beachImg} from "../../../App";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png"

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />;
    }
    

    return (
        <div>
            <div>
                <img src={beachImg} alt="logo"/>
            </div>
            <div className={classes.descriptionBlock}>
                {props.profile && props.profile.photos? (
                <img src={props.profile.photos.large || userPhoto} alt=""/>
                    ) : (
                        <Preloader />
                )}
                ava + description
            </div>
        </div>
    )
        ;
};

export default ProfileInfo;