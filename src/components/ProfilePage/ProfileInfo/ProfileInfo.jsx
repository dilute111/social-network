import React from 'react';
import {beachImg} from "../../../App";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png"
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader/>;
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0]
            savePhoto(file)
        }
    }

    return (
        <>
            <div>
                <img className={classes.coverImg} src={beachImg} alt="logo"/>
            </div>
            <div className={classes.descriptionBlock}>
                {profile && profile.photos ? (
                    <div className={classes.userAvatar}>
                        <img src={profile.photos.large || userPhoto} alt=""/>
                        {isOwner ? <input type="file" onChange={onMainPhotoSelected}/> : ""}
                    </div>
                ) : (
                    <Preloader/>
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