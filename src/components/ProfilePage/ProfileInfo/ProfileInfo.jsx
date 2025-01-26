import React from 'react';
import {beachImg} from "../../../App";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png"
import ProfileStatus from "../../ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />;
    }
    

    return (
        <>
            <div>
                <img className={classes.coverImg} src={beachImg} alt="logo"/>
            </div>
            <div className={classes.descriptionBlock}>
                {props.profile && props.profile.photos? (
                <img src={props.profile.photos.large || userPhoto} alt=""/>
                    ) : (
                        <Preloader />
                )}
                <div className={classes.profileStatus}>
                <ProfileStatus status="Hello, my friends" />
                </div>

            </div>
        </>
    )
        ;
};

export default ProfileInfo;