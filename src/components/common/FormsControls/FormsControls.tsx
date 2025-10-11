import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import classes from "./FormsControls.module.css";
import validatePostText from "../../../utils/validators/validators";
import {FC} from "react";
import {IFormControlProps} from "../../../types/types";

export const FormControl: FC<IFormControlProps> = ({Component, name, register, errors, touchedFields, validate, ...rest}) => (
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
export const LoginStock = ({ login, captchaUrl }) => {
    console.log(captchaUrl)
    const {
        register, handleSubmit, setValue,
        setError, reset,
        formState: {errors, touchedFields}
    } = useForm({
        mode: "onChange", // Валидация при изменении для немедленной обратной связи
    });

    useEffect(() => {
        if (captchaUrl) {
            setValue("captcha", ""); // Очищаем поле при смене капчи
        }
    }, [captchaUrl, setValue]);

    const onSubmit = async (formData) => {
        try {
            console.log(formData)
            await login(formData.email, formData.password, formData.rememberMe, formData.captcha, setError, setValue);
        } catch (error) {
            console.error('Ошибка при входе:', error);
        }
    }
    const onError = () => {
        reset({}, { keepValues: true })
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
            { captchaUrl  && <img src={captchaUrl} alt=""/>}
            { captchaUrl  && <FormControl
                Component="input"
                name="captcha"
                register={register}
                errors={errors}
                touchedFields={touchedFields}
                required="Captcha is required"
                placeholder="Enter captcha"
                type="text"
                validate="required"
            /> }
            <button type="submit">Sign in</button>
            <div className={classes.error}>
                {errors.server && <span>{errors.server.message}</span>}
            </div>
        </form>
    );
};
