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

const Login = (props) => {
    const navigate = useNavigate();

     useEffect(() => {
         if (props.isAuthorized) {
             navigate("/profile");
         }
     }, [props.isAuthorized, navigate]);

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm login={props.login}/>
        </div>
    );
};
const mapStateToProps = (state) => ({
  isAuthorized: state.auth.isAuthorized,
})

export default connect(mapStateToProps, {login})(Login)
