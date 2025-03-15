import React, {useEffect} from "react";
import {LoginStock} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {useNavigate} from "react-router-dom";

const LoginForm = ({login}) => {
    return (
        <LoginStock login={login}/>
    );
};

const Login = ({isAuthorized, login }) => {
    const navigate = useNavigate();

     useEffect(() => {
         if (isAuthorized) {
             navigate("/profile");
         }
     }, [isAuthorized, navigate]);

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm login={login}/>
        </div>
    );
};
const mapStateToProps = (state) => ({
  isAuthorized: state.auth.isAuthorized,
})

export default connect(mapStateToProps, {login})(Login)
