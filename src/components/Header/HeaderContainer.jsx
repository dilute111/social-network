import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        fetch(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Распарсим JSON
            })
            .then((data) => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    this.props.setAuthUserData(id, email, login);
                } else {
                    console.error("Failed to fetch posts", data.messages);
                }

            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuthorized: state.auth.isAuthorized,
    login: state.auth.login,
})


export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)