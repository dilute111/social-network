import React, {useState} from "react";
import classes from "./ProfileDataForm.module.css";
import {FormControl} from "../../common/FormsControls/FormsControls";
import {useForm} from "react-hook-form";

const ProfileDataForm = ({profile, onSubmit, setEditMode, errorMessage}) => {
    const [expanded, setExpanded] = useState(true);
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: {errors, touchedFields},
    } = useForm({
        defaultValues: {
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            contacts: profile.contacts || {},
        },
    });

    const handleHeaderClick = () => {
        setExpanded(!expanded);
        if (expanded) {
            setEditMode(false); // Устанавливаем editMode в false при сворачивании формы
        }
    }

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data, setError))}>
            <div
                className={classes.bio}>
                <div className={classes.header} onClick={handleHeaderClick}>
                    Main user info
                    <span>▲</span>
                </div>
                {expanded && ( // Показываем содержимое формы, только если expanded === true
                    <>
                        <div className={classes.formGroup}>
                            <b className={classes.userName}>Name: </b>
                            <FormControl Component="input" name="fullName" register={register} errors={errors}
                                         touchedFields={touchedFields}/>
                        </div>
                        <div className={classes.formGroup}>
                            <b>Looking for a job: </b>
                            <input type="checkbox" {...register("lookingForAJob")} />
                        </div>
                        <div className={classes.formGroup}>
                            <b>My professional skills: </b>
                            <div className={classes.skills}>
                                <FormControl Component="textarea" name="lookingForAJobDescription" register={register}
                                             errors={errors} touchedFields={touchedFields}/>
                            </div>
                        </div>
                        <div className={classes.formGroup}>
                            <b>About me: </b>
                            <FormControl Component="textarea" name="aboutMe" register={register} errors={errors}
                                         touchedFields={touchedFields}/>
                        </div>
                        <div className={classes.formGroup}>
                        <div className={classes.userContacts}>
                            <b>Contacts: </b>
                            {Object.keys(profile.contacts).map((key) => {
                                return (
                                    <div key={key} className={classes.contact}>
                                        <b>{key}:</b>
                                        <FormControl Component="input" name={`contacts.${key}`} register={register}
                                                     errors={errors} touchedFields={touchedFields}/>
                                        {typeof errorMessage === 'string' ?
                                        (key.includes(errorMessage.split(/[-()>]/)[3].toLowerCase())) &&
                                            <span className={classes.error}>{errorMessage}</span> : ""
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        </div>

                        <div>
                            <button type="submit" className={classes.saveButton}>Save info</button>
                        </div>
                    </>
                )}
            </div>
        </form>
    );
}

export default ProfileDataForm