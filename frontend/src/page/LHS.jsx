import React, { useState, useEffect } from "react";
import {Nav} from "react-bootstrap"
import { Fa500Px, FaRegMoon, FaFolder, FaFolderOpen } from "react-icons/fa";
import { SiWpexplorer } from "react-icons/si";
const LHS = ({
    path,
    data = [],
    sendLocation,
    selected, 
    setSelected
}) => {


    const [mainFolderNmae, setFolderName] = useState("");

    const changeDirectory = (name) => {
        setSelected(name)
        sendLocation(path+`\\`+name)
    }

    return(
        <div className="sidebar-container">
            <div className="logo">
                <button className="btn custom-btn1">
                    <Fa500Px />
                </button>
                <span className="logo-name">MonitorFolder</span>
                <button 
                    className="btn theme-switch-button"
                    onClick={()=> {
                        sendLocation("E:\\RProject", "oneTime");
                        setFolderName("Server")
                    }}
                >
                    <SiWpexplorer />
                </button>
            </div>
            {
                Object.keys(data).length ?
                <div style={{overflowY: "auto", height: "100%"}}>

                    <div className="main-folder">
                        <FaFolderOpen /> {mainFolderNmae}
                    </div>

                    <Nav className="flex-column">
                        {
                            data.map((d) => {
                                if(d.type == "directory"){
                                    return <Nav.Link 
                                    className={selected == d.name?"listing-active":"listing"} 
                                    eventKey="link-0"
                                    onClick={()=> changeDirectory(d.name)}
                                    > <FaFolder /> {d.name}</Nav.Link>
                                }
                            })
                        }
                    </Nav>

                </div>:""
            }

        </ div>
    )

}

export default LHS