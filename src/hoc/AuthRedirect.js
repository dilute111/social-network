import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuthorized: state.auth.isAuthorized,
})

const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuthorized) return <Navigate to="/login" />
            return <Component {...this.props} />
        }
    }

    let connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return connectedAuthRedirectComponent;
};

export default withAuthRedirect;