import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {beachImg} from "../../../App";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png"
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {FC} from "react";
import {
    IContactProps,
    IProfile,
    IProfileDataProps,
    IProfileFormData,
    IProfileInfoProps
} from "../../../types/types";

export const Contact: FC<IContactProps> = ({contactTitle, contactValue}) => {
    return (
        <div className={classes.contact}>
            <b>{contactTitle}:</b> <span>{contactValue}</span>
        </div>
    )
}

const ProfileData: FC<IProfileDataProps> = ({profile, isOwner, activateEditMode, expanded, setExpanded}) => {
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

const handleServerError = (error: any, setError?: any, setErrorMessage?: (message: string | null) => void) => {
    if (error.errors && setError) {
        // Структурированные ошибки из API
        error.errors.forEach(({ field, message }: { field: string; message: string }) => {
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
            // Общая ошибка
            setErrorMessage?.(error.message);
        }
    } else if (typeof error === 'string') {
        // Просто текст ошибки
        setErrorMessage?.(error);
    } else {
        // Неизвестная ошибка
        setErrorMessage?.('An error occurred while saving profile');
    }
};

const ProfileInfo: FC<IProfileInfoProps> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    if (!profile) {
        return <Preloader/>;
    }

    const activateEditMode = (e: MouseEvent) => {
        setEditMode(true)
        e.stopPropagation();
    };

    const onSubmit = async (formData: IProfileFormData, setError?: any) => {
        try {
            const profileInfo: IProfile = {
                ...profile,           // берем существующий профиль
                ...formData,          // добавляем данные из формы
                userId: profile.userId, // сохраняем обязательные поля
                photos: profile.photos
            };

            const result = await saveProfile(profileInfo)

            if (result && result.error) {
                // Обрабатываем ошибку из результата
                handleServerError(result.error, setError, setErrorMessage);
            } else {
                // Успешное сохранение
                setEditMode(false);
                setExpanded(true);
                setErrorMessage(null);
            }

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

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
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