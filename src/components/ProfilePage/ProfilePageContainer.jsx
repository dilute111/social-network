import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfilePage from "./ProfilePage";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
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
        fetch(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                return res.json()
            })
            .then((data) => {
                this.props.setUserProfile(data)
            })
            .catch((err) => {
                console.error("Failed to fetch posts", err);
            })
    }

    render() {
        return(
          <ProfilePage {...this.props} profile={this.props.profile} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

let containerComponentWithUrl = withRouter(ProfilePageContainer);

export default connect(mapStateToProps, {setUserProfile})(containerComponentWithUrl);