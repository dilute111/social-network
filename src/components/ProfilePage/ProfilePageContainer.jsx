import React from 'react';
import ProfilePage from "./ProfilePage";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
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
        let userId = this.props.params.userId || 2;
        this.props.getUserProfile(userId)
    }

    render() {

        return (
            <ProfilePage {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

export default compose(
    connect(mapStateToProps, {getUserProfile,}),
    withRouter,
    withAuthRedirect
)(ProfilePageContainer)







