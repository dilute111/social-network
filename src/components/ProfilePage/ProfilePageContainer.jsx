import React from 'react';
import ProfilePage from "./ProfilePage";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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
        return(
          <ProfilePage {...this.props} profile={this.props.profile} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

let containerComponentWithUrl = withRouter(ProfilePageContainer);

export default connect(mapStateToProps, {getUserProfile, })(containerComponentWithUrl);