import React from "react";
import {useForm} from "react-hook-form";
import classes from "./FormsControls.module.css";
import validatePostText from "../../../utils/validators/validators";

const FormControl = ({Component, name, register, errors, touchedFields, validate, ...rest}) => (
    <div className={`${errors[name] ? classes.error : ""}`}>
        <Component {...register(name, {validate})} {...rest} />
        {errors[name] && touchedFields?.[name] && (
            <span className={classes.errorMessage}>{errors[name].message}</span>
        )}
    </div>
);

// Использование в MyPostsForm
export const MyPostsStock = ({onAddPost}) => {
    const {
        register, handleSubmit,
        reset, setValue,
        formState: {errors, touchedFields}
    } = useForm();

    const onSubmit = (data) => {
        onAddPost(data.newPostText);
        reset();
    };
    const onError = () => {
        setValue("newPostText", "")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormControl Component="textarea" name="newPostText" register={register} errors={errors}
                         touchedFields={touchedFields} validate={validatePostText(2, 35)}
                         placeholder="Enter your message"/>
            <button type="submit">Add post</button>
        </form>
    )
};

// Использование в AddMessageForm
export const AddMessageStock = ({sendMessage}) => {
    const {
        register, handleSubmit,
        reset, setValue,
        formState: {errors, touchedFields}
    } = useForm();

    const onSubmit = (data) => {
        if (data.newMessage.trim()) {
            sendMessage(data.newMessage);
            reset();
        }
    };
    const onError = () => {
        setValue("newMessage", "")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormControl Component="textarea" name="newMessage" register={register} errors={errors}
                         touchedFields={touchedFields} validate={validatePostText(null, 50)}
                         placeholder="Enter your message"/>
            <button type="submit">Send</button>
        </form>
    );
};

// Использование в LoginForm
export const LoginStock = ({ login }) => {
    const {
        register, handleSubmit, setValue,
        formState: {errors, touchedFields}
    } = useForm();

    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe);
    }

    const onError = () => {
        if(errors.email) {
            setValue("email", "")
        }
        if(errors.password) {
            setValue("password", "")
        }
    }

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data), onError)}>
            <FormControl Component="input" name="email" register={register} errors={errors}
                         touchedFields={touchedFields} validate={validatePostText(2, 30)} placeholder="Email"/>
            <FormControl Component="input" name="password" register={register} errors={errors}
                         touchedFields={touchedFields} validate={validatePostText(2, 15)} placeholder="Password"
                         type="password"/>
            <div>
                <input type="checkbox" {...register("rememberMe")} /> Remember me
            </div>
            <button type="submit">Sign in</button>
        </form>
    );
};
