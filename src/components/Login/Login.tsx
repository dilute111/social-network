import React, {FC, useEffect} from "react";
import {LoginStock} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {useNavigate} from "react-router-dom";
import {IAuthInitialState, ILoginFormProps, IMapStateProps, LoginComponentProps} from "../../types/types";

const LoginForm: FC<ILoginFormProps> = ({login, captchaUrl}) => {
    return (
        <LoginStock login={login} captchaUrl={captchaUrl}/>
    );
};

const Login: FC<LoginComponentProps> = ({isAuthorized, login, captchaUrl }) => {
    const navigate = useNavigate();

     useEffect(() => {
         if (isAuthorized) {
             navigate("/profile");
         }
     }, [isAuthorized, navigate]);

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm login={login} captchaUrl={captchaUrl}/>
        </div>
    );
};
const mapStateToProps = (state: { auth: IAuthInitialState }): IMapStateProps => ({
    captchaUrl: state.auth.captchaUrl,
  isAuthorized: state.auth.isAuthorized,
})

export const connector = connect(mapStateToProps, { login })

export default connector(Login);