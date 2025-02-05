import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input placeholder="Login" {...register("login", { required: true })}
                />
            </div>
            <div>
                <input placeholder="Password" type="password" {...register("password", { required: true })}
                />
            </div>
            <div>
                <input type="checkbox" {...register("rememberMe")}/> Remember me
            </div>
            <div>
                <button type="submit">Sign in</button>
            </div>
        </form>
    );
};

const Login = () => {
    const onSubmit = (formData) => {
        console.log(formData);
    };

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};

export default Login;
