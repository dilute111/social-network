import React from 'react';
import Header from "./Header";
import {connect, ConnectedProps} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {IHeaderProps} from "../../types/types";
import {RootState} from "../../redux/redux-store";

const mapStateToProps = (state: RootState): IHeaderProps => ({
    isAuthorized: state.auth.isAuthorized,
    login: state.auth.login,
})

const connector = connect(mapStateToProps, {logout})

type PropsFromRedux = ConnectedProps<typeof connector>

class HeaderContainer extends React.Component<PropsFromRedux> {
    render() {
        return <Header {...this.props} />
    }
}


export default connector(HeaderContainer)