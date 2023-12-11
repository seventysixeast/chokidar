import React, {useEffect, useState} from "react";
import Breadcrumb from "./component/breadCrumb";
import FileViewer from "./component/FileViewer";
const RHS = ({
    basePath,
    data = [],
    sendLocation,
    updatedPath,
    ViewerIsOn, 
    setViewerOn
}) => {

    const [dPath, setDPath] = useState([])
    const [fileName, setFileName] = useState("");

    useEffect(()=>{
        if(ViewerIsOn){
            let a = updatedPath.split("\\")
            a.push(fileName)
            setDPath(a)
        } else {
            setDPath(updatedPath.split("\\"))
        }
        
    },[updatedPath, ViewerIsOn])

    const simplefromate = () => {
        return data.map((d, index)=> {
            if(d.type == "file"){
                let a = d.name.split(".");
                if(a[a.length-1] == "txt"){
                    return ( 
                        <div 
                            key={"RHS"+index} 
                            className={ a[a.length-1] == "txt"?"file-box-simple":"file-only"}
                            onClick={()=>{
                                if(a[a.length-1] == "txt"){
                                    setViewerOn(true)
                                    setFileName(d.name) 
                                }
                                
                            }}
                        > 
                            {/* <span className="file-icon-simple"><FaRegFileLines /></span> */}
                            <span className="file-name"> {d.name}</span>
                        </div>
                    )
                }
            } else {
                return (
                    <div 
                        key={"RHS"+index} 
                        className="file-box-simple"
                        onClick={()=>{
                            sendLocation(updatedPath+"\\"+d.name)
                        }}
                    >
                        {/* <span className="file-icon-simple"><FaFolder /> </span>  */}
                        <span className="file-name">{d.name}</span>
                        <span className="file-name"> ({d.count})</span>
                    </div>
                )
            }
        })
    }

    return(
        <div className="main-container">
            
            <Breadcrumb 
                basePath={basePath}
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
                    simplefromate()
                }

            </div>
        </div>
    )
}

export default RHS;