import React, {useEffect, useState} from "react";
// import {Breadcrumb} from "react-bootstrap";
import Breadcrumb from "./component/breadCrumb";
import { FaLeaf, FaRegFileLines } from "react-icons/fa6";
import { Fa500Px, FaRegMoon, FaFolder, FaFolderOpen } from "react-icons/fa";
import FileViewer from "./component/FileViewer";
const RHS = ({
    path,
    data = [],
    sendLocation,
    updatedPath,
    ViewerIsOn, 
    setViewerOn
}) => {

    const [dPath, setDPath] = useState([])
    const [fileName, setFileName] = useState("");

    useEffect(()=>{
        setDPath(updatedPath.split("\\"))
    },[updatedPath])

    const showFolderAndFile = () => {
        return data.map((d, index)=> {
            if(d.type == "file"){
                let a = d.name.split(".")
                console.log("aaa", a);
                console.log(a[a.length-1])
                if(a[a.length-1] == "txt"){
                    return ( 
                        <div 
                            key={"RHS"+index} 
                            className="file-box"
                            onClick={()=>{
                                setViewerOn(true)
                                setFileName(d.name)
                            }}
                        > 
                            <span className="file-icon"><FaRegFileLines /></span>
                            <span className="file-name">{d.name}</span>
                        </div>
                    )   
                }
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

    return(
        <div className="main-container">
            
                {
                    dPath.length?<h1>{dPath[dPath.length-1]}</h1>:""
                }
            
            <Breadcrumb 
                bread={dPath} 
                sendLocation={sendLocation} 
                setViewerOn={setViewerOn}
            />
            <div className={`file-body ${ViewerIsOn?"file-c":""}`}>

                {
                    ViewerIsOn?
                        <>
                            <FileViewer location={updatedPath+"\\"+fileName} />
                        </>
                    :
                        showFolderAndFile()
                }

            </div>
        </div>
    )
}

export default RHS;