import React, {useState} from 'react';
import {beachImg} from "../../../App";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png"
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

export const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={classes.contact}>
            <b>{contactTitle}:</b> <span>{contactValue}</span>
        </div>
    )
}

const ProfileData = ({profile, isOwner, activateEditMode, expanded, setExpanded}) => {
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

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);
    let [expanded, setExpanded] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)

    if (!profile) {
        return <Preloader/>;
    }

    const activateEditMode = (e) => {
        setEditMode(true)
        e.stopPropagation();
    };

    const onSubmit = async (formData, setError) => {
        try {
            await saveProfile(formData); // saveProfile возвращает промис из thunk
            setEditMode(false);
            setExpanded(true);
            setErrorMessage(null); // Убираем общее сообщение об ошибке
        } catch (error) {
            if (error.errors && setError) {
                // Структурированные ошибки
                error.errors.forEach(({ field, message }) => {
                    setError(field, { type: "server", message });
                });
            } else if (error.message && setError) {
                // Парсим общую ошибку вида "Invalid url format (Contacts -> facebook)"
                const match = error.message.match(/Invalid url format \(Contacts -> (\w+)\)/);
                if (match) {
                    const fieldName = match[1].toLowerCase();
                    setError(`contacts.${fieldName}`, {
                        type: "server",
                        message: "Invalid URL format",
                    });
                } else {
                    // Если ошибка не связана с конкретным полем, можно оставить общее сообщение
                    setErrorMessage(error.message);
                }
            }
        }
    };

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

                        {editMode ? <ProfileDataForm profile={profile}
                                                     onSubmit={onSubmit}
                                                     setExpanded={setExpanded}
                                                     setEditMode={setEditMode}
                                                     errorMessage={errorMessage}
                            /> :
                            <ProfileData activateEditMode={activateEditMode} profile={profile} isOwner={isOwner}
                                         expanded={expanded} // Передаём expanded
                                         setExpanded={setExpanded} // Передаём setExpanded
                            />}
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