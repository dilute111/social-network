import React from 'react';
import loader from "../../../assets/images/loader.gif";

const Preloader = (props) => {
    return (
        <div style={{backgroundColor: "black"}}>
            <img style={{width: "100px", height: "100px"}} src={loader} alt=""/>
        </div>
    );
};

export default Preloader;