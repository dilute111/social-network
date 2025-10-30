import React from 'react';
import ProfilePage from "./ProfilePage";
import {connect, ConnectedProps} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import withAuthRedirect from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {IProfilePageContainerMapStateProps, IWithRouterProps} from "../../types/types";
import {RootState} from "../../redux/redux-store";

function withRouter(Component: React.ComponentType<any>) {
    return (props: any) => {
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



class ProfilePageContainer extends React.Component<ProfilePageContainerProps> {

    refreshProfile() {
        let userId = this.props.params.userId || this.props.authorizedUserId
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: ProfilePageContainerProps, prevState: {}, snapshot?: any) {
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

let mapStateToProps = (state: RootState): IProfilePageContainerMapStateProps => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuthorized: state.auth.isAuthorized,
})

const connector = connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile})

type ProfilePageContainerProps = IWithRouterProps & ConnectedProps<typeof connector>

export default compose(
    connector,
    withRouter,
    withAuthRedirect
)(ProfilePageContainer)
