import React, { useState, useEffect } from "react";
import {Nav} from "react-bootstrap"
import { Fa500Px, FaRegMoon, FaFolder, FaFolderOpen } from "react-icons/fa";
import { SiWpexplorer } from "react-icons/si";
const LHS = ({
    path,
    data = [],
    sendLocation,
    selected, 
    setSelected,
    setViewerOn
}) => {


    const [mainFolderNmae, setFolderName] = useState("");

    useEffect(()=>{
        let a = path.split("\\")
            a = a[a.length-1]
            setFolderName(a)
    },[path, data])

    const changeDirectory = (name) => {
        setSelected(name)
        sendLocation(path+`\\`+name)
        setViewerOn(false)
    }

    return(
        <div className="sidebar-container">
            <div className="logo">
                <button className="btn custom-btn1">
                    {/* <Fa500Px /> */}M
                </button>
                <span className="logo-name">Monitor Folder</span>
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