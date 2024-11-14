import React from 'react';

import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/ProfilePage";



export const source = "https://skillforge.com/wp-content/uploads/2020/10/angular.png"
export const beachImg = "https://avatars.mds.yandex.net/get-altay/927353/2a00000188a175c18d18238c954520c63d15/orig"

const App = () => {
    return (

        <div className="app-wrapper">
            <Header />
            <Navbar />
            <ProfilePage />

        </div>
    );
}


export default App;
