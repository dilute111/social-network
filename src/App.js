import React from 'react';

import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import FriendsPage from "./components/FriendsPage/FriendsPage";


export const source = "https://skillforge.com/wp-content/uploads/2020/10/angular.png"
export const beachImg = "https://avatars.mds.yandex.net/get-altay/927353/2a00000188a175c18d18238c954520c63d15/orig"
export const avatar = "https://i.pinimg.com/736x/fc/a2/21/fca2210d4ccac0da3119daf20f876a0d.jpg"

const App = (props) => {
    return (
        <BrowserRouter>
        <div className="app-wrapper">
            <Header/>
            <Navbar d={props.state.messagesPage.d}/>
            <div className="app-wrapper-content">
                <Routes >
                <Route path="/profile" element={<ProfilePage p={props.state.profilePage.p} addPost={props.addPost} />} />
                <Route path="/messages" element={<Dialogs d={props.state.messagesPage.d} m={props.state.messagesPage.m} />} />
                <Route path="/news" element={<News/>} />
                <Route path="/music" element={<Music />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/friends" element={<FriendsPage />} />
                </Routes>
            </div>
        </div>
        </BrowserRouter>
    );
}


export default App;
