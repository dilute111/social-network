import React, {useEffect} from "react";
import {LoginStock} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {useNavigate} from "react-router-dom";

const LoginForm = ({login, captchaUrl}) => {
    return (
        <LoginStock login={login} captchaUrl={captchaUrl}/>
    );
};

const Login = ({isAuthorized, login, captchaUrl }) => {
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
const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
  isAuthorized: state.auth.isAuthorized,
})

export default connect(mapStateToProps, {login})(Login)
