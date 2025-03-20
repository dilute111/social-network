import React, {useState} from 'react';
import {beachImg} from "../../../App";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png"
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={classes.contact}>
            <b>{contactTitle}: {contactValue}</b>
        </div>
    )
}

const ProfileData = ({profile, isOwner, activateEditMode}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <div
                className={`${classes.bio} ${expanded ? classes.expanded : ''}`}
                onClick={() => setExpanded(!expanded)}
            >
                Main user info
                <span className={classes.toggleArrow}>{expanded ? "▲" : "▼"}</span>
                <div>
                    <b>Name: </b> {profile.fullName}
                </div>
                <div>
                    <b>Looking for a job: </b> {profile.lookingForAJob ? "yes" : "no"}
                </div>
                <div>
                    <b>My professional skills: </b> <div className={classes.skills}>
                    {profile.lookingForAJobDescription || `not filled`} </div>
                </div>
                <div>
                    <b>About me: </b> {profile.aboutMe}
                </div>
                <div>
                    <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })
                }
                </div>
                {isOwner && <div>
                    <button onClick={activateEditMode} className={classes.editButton}>Edit info</button>
                </div>}
            </div>

        </div>
    )
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    let [editMode, setEditMode] = useState(false);

    const activateEditMode = (e) => {
        e.stopPropagation();
        setEditMode(true)
    };

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
                    <div className={classes.userDescription}>
                        <img src={profile.photos.large || userPhoto} alt=""/>
                        {isOwner ? <input type="file" onChange={onMainPhotoSelected}/> : ""}

                        {editMode ? <ProfileDataForm profile={profile}/> :
                            <ProfileData activateEditMode={activateEditMode} profile={profile} isOwner={isOwner}/>}
                    </div>

                ) : (
                    <Preloader/>
                )}
                <div className={classes.profileStatus}>
                    Status <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>

            </div>
        </>
    )


};

export default ProfileInfo