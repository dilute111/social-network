import React from 'react';
import ProfilePage from "./ProfilePage";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {useNavigate, useParams, useLocation, Navigate} from 'react-router-dom';
import withAuthRedirect from "../../hoc/AuthRedirect";
import {compose} from "redux";

function withRouter(Component) {
    return (props) => {
        const navigate = useNavigate();
        const params = useParams();
        const location = useLocation();

        return (
            <Component
                {...props}
                navigate={navigate}
                params={params}
                location={location}
            />
        );
    };
}


class ProfilePageContainer extends React.Component {

    componentDidMount() {
        console.log("PARAMS" ,this.props.params)
        console.log("Authorized User ID:", this.props.authorizedUserId);
        let userId = this.props.params.userId || this.props.authorizedUserId
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {

        return (
            <ProfilePage {...this.props} profile={this.props.profile} status={this.props.status}
            updateStatus={this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuthorized: state.auth.isAuthorized,
})

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfilePageContainer)







