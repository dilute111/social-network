import React, {FC} from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {RootState} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: RootState) => ({
    isAuthorized: state.auth.isAuthorized,
})

type MapPropsType = {
    isAuthorized: boolean
}

export function withAuthRedirect<WCP>  (WrappedComponent: React.ComponentType<WCP>)  {
    const RedirectComponent: FC<MapPropsType> = (props) => {
        const {isAuthorized} = props

        if (!isAuthorized) return <Navigate to="/login"/>
        return <WrappedComponent {...props as WCP} />
    }

    let connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return connectedAuthRedirectComponent;
};

export default withAuthRedirect;