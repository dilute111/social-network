import React from 'react';
import {beachImg} from "../../../App";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png"
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader />;
    }

    return (
        <>
            <div>
                <img className={classes.coverImg} src={beachImg} alt="logo"/>
            </div>
            <div className={classes.descriptionBlock}>
                {profile && profile.photos? (
                <img src={profile.photos.large || userPhoto} alt=""/>
                    ) : (
                        <Preloader />
                )}
                <div className={classes.profileStatus}>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>

            </div>
        </>
    )
        ;
};

export default ProfileInfo;