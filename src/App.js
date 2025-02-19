import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfilePageContainer from "./components/ProfilePage/ProfilePageContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

export const source = "https://skillforge.com/wp-content/uploads/2020/10/angular.png"
export const beachImg = "https://avatars.mds.yandex.net/get-altay/927353/2a00000188a175c18d18238c954520c63d15/orig"
export const avatar = "https://i.pinimg.com/736x/fc/a2/21/fca2210d4ccac0da3119daf20f876a0d.jpg"

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component {...props} router={{ location, navigate, params }} />
        );
    }
    return ComponentWithRouterProp;
}

function App({ initializeApp, initialized }) {
    useEffect(() => {
        initializeApp()
    }, [initializeApp])

    if(!initialized){
        return <Preloader />
    }
    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path="/profile/:userId?" element={<ProfilePageContainer/>}/>
                    <Route path="/messages/*" element={<DialogsContainer/>}/>
                    <Route path="/users" element={<UsersContainer/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/friends" element={<FriendsPage/>}/>
                </Routes>
            </div>
        </div>

    );
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp }))(App)