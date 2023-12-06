import React, { useState, useEffect } from "react";
import {Nav} from "react-bootstrap"
import { Fa500Px, FaRegMoon, FaFolder, FaFolderOpen } from "react-icons/fa";
import { SiWpexplorer } from "react-icons/si";
const LHS = ({
    path,
    data = [],
    sendLocation
}) => {

    const [mainFolderNmae, setFolderName] = useState("");

    return(
        <div className="sidebar-container">
            <div className="logo">
                <button className="btn custom-btn1">
                    <Fa500Px />
                </button>
                <span className="logo-name">Chokidar</span>
                <button 
                    className="btn theme-switch-button"
                    onClick={()=> {
                        sendLocation("E:\\RProject\\explorer\\server", "oneTime");
                        setFolderName("Server")
                    }}
                >
                    <SiWpexplorer />
                </button>
            </div>

            {/* <input type="file" id="folder" webkitdirectory multiple/> */}

            {
                console.log(data)
            }

            {
                Object.keys(data).length ?
                <>

            <div style={{
                marginTop: "20px",
                marginBottom: "6px"
            }}>
                <FaFolderOpen /> {mainFolderNmae}
            </div>

            <Nav defaultActiveKey="/home" className="flex-column">
                {
                    data.map((d) => {
                        if(d.type == "directory"){
                            return <Nav.Link 
                            className="listing" 
                            eventKey="link-0"
                            > <FaFolder /> {d.name}</Nav.Link>
                        }
                    })
                }
                
            </Nav>

                </>:""
            }

        </ div>
    )

}

export default LHS