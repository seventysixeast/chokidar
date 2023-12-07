import React, {useEffect, useState} from "react";
// import {Breadcrumb} from "react-bootstrap";
import Breadcrumb from "./component/breadCrumb";
import { FaRegFileLines } from "react-icons/fa6";
import { Fa500Px, FaRegMoon, FaFolder, FaFolderOpen } from "react-icons/fa";
const RHS = ({
    path,
    data = [],
    sendLocation,
    updatedPath
}) => {

    const [dPath, setDPath] = useState([])

    useEffect(()=>{
        setDPath(updatedPath.split("\\"))
    },[updatedPath])

    return(
        <div className="main-container">
            
                {
                    dPath.length?<h1>{dPath[dPath.length-1]}</h1>:""
                }
            
            <Breadcrumb bread={dPath} sendLocation={sendLocation} />
            <div className="file-body">

                {
                    data.map((d, index)=> {
                        if(d.type == "file"){
                            return ( 
                                <div 
                                    key={"RHS"+index} 
                                    className="file-box"
                                > 
                                    <span className="file-icon"><FaRegFileLines /></span>
                                    <span className="file-name">{d.name}</span>
                                </div>
                            )
                        } else {
                            return (
                                <div 
                                    key={"RHS"+index} 
                                    className="file-box"
                                    onClick={()=>{
                                        sendLocation(updatedPath+"\\"+d.name)
                                    }}
                                >
                                    <span>
                                        <span className="file-icon"><FaFolder /></span> 
                                        <span className="file-name">({d.count})</span>
                                    </span>
                                    <span className="file-name">{d.name}</span>
                                </div>
                            )
                        }
                    })
                }

            </div>
        </div>
    )
}

export default RHS;