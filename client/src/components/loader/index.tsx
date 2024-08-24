import React from "react";
import Lottie from "react-lottie";
import animationData from "./animation/loading-anim.json";

const Loader: React.FC = ()  => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData
    };
    
    return (
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%", width:"100%", maxHeight:"300px", maxWidth:"auto"}}>
            <Lottie options={defaultOptions}  />
        </div>
    );
}

export default Loader;