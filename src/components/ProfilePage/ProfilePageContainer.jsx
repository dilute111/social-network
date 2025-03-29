import React from 'react';
import ProfilePage from "./ProfilePage";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
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

    refreshProfile() {
        let userId = this.props.params.userId || this.props.authorizedUserId
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let userId = this.props.params.userId || this.props.authorizedUserId
        if (userId !== (prevProps.params.userId || prevProps.authorizedUserId)) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <ProfilePage {...this.props}
                         isOwner={!this.props.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile}
            />
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
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfilePageContainer)
