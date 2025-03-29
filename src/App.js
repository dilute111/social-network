import React, {Suspense, useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import NotFound from "./components/NotFound/NotFound";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfilePageContainer = React.lazy(() => import("./components/ProfilePage/ProfilePageContainer"))
const News = React.lazy(() => import("./components/News/News"))
const Music = React.lazy(() => import("./components/Music/Music"))
const Settings = React.lazy(() => import("./components/Settings/Settings"))
const FriendsPage = React.lazy(() => import("./components/FriendsPage/FriendsPage"))


export const source = "https://skillforge.com/wp-content/uploads/2020/10/angular.png"
export const beachImg = "https://avatars.mds.yandex.net/get-altay/927353/2a00000188a175c18d18238c954520c63d15/orig"
export const avatar = "https://i.pinimg.com/736x/fc/a2/21/fca2210d4ccac0da3119daf20f876a0d.jpg"

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
                <Suspense fallback={<Preloader />}>
                <Routes>

                    <Route path="/" element={<Navigate to ={"/profile"}/>}/>
                    <Route path="/profile/:userId?" element={<ProfilePageContainer/>}/>
                    <Route path="/messages/*" element={<DialogsContainer/>}/>
                    <Route path="/users" element={<UsersContainer/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/friends" element={<FriendsPage/>}/>
                    <Route path="*" element={<NotFound/>}/>

                </Routes>
                </Suspense>
            </div>
        </div>

    );
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

const AppContainer = connect(mapStateToProps, {initializeApp })(App)

const MainApp = (props) => {
    return (
    <React.StrictMode>
        <HashRouter >
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    </React.StrictMode>
    )
}

export default MainApp