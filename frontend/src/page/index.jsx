import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import axios from "axios";
import io from 'socket.io-client'; // Included client side socket io
import "./css/MainPage.css";
import "./css/LHS.css";
import "./css/RHS.css";
import "./css/breadcrumb.css";
import LHS from "./LHS";
import RHS from "./RHS";

const MainPage = () => {

    const [data, setData] = useState([])
    const [keepUpdated, setKeepUpdating] = useState([])
    const [basePath, setBasePath] = useState("");
    const [updatedPath, setUpdatedPath] = useState("");
    const [selected, setSelected] = useState("");
    const [updateViaS, setUpdateViaS] = useState("");
    const [ViewerIsOn, setViewerOn] = useState(false);
    const [selectedDirectory, setSelectedDirectory] = useState(null);

    // ============================
    useEffect(()=>{
        const socket = io('http://localhost:4040');

        // Event listener for 'selectedDirectory' event(when home directory is selected)
        socket.on('selectedDirectory', ({ selectedDirectory }) => {
        console.log('Received selected directory:', selectedDirectory);
        setSelectedDirectory(selectedDirectory);
        getLocalFileData(selectedDirectory, "oneTime")
        });

        // // Bleow is Event listener for 'directoryChange' event
        socket.on('directoryChange', ({ event, path }) => {
            console.log('Directory change event:', event, path);
            setUpdateViaS(path || ""); // Ensure path is not null or empty
            
            // getLocalFileData(selectedDirectory, "oneTime")
            // Vishal add any code to be executed on directory change here
        });
        return () => {
        socket.disconnect();
        };
    },[])

    useEffect(() => {
        console.log('basePath:', basePath);
        console.log('basePath:', updatedPath);
        console.log('updateViaS:', updateViaS);
        if (basePath && updateViaS) {
            getLocalFileData(updatedPath);
            setUpdateViaS("");
        }
    }, [basePath, updatedPath, updateViaS]);

    // ============================


    const getLocalFileData = async (path, type = null) => {

        console.log("=======", path)
        console.log("=======", type)

        let res = await axios.post(
            "http://localhost:4040/get-location",
            {
                url: path,
                type: type
            }
        );
        console.log("-------------------------", res)
        if(res.data.success){
            if(type == "oneTime"){
                setBasePath(path)
                setUpdatedPath(path)
                setData(res.data.directoryInfo);
                setKeepUpdating(res.data.directoryInfo)
            } else {
                setKeepUpdating(res.data.directoryInfo)
                setUpdatedPath(path)
            }
        }
    }

    return(
        <>
            <div className="containers">
                <span className="LHS-body">
                    <LHS 
                        path={basePath}
                        data={data} 
                        sendLocation={getLocalFileData} 
                        selected={selected} 
                        setSelected={setSelected}
                        setViewerOn={setViewerOn}
                    />
                </span>
                <span className="RHS-body">
                    <RHS 
                        basePath={basePath}
                        updatedPath={updatedPath} 
                        data={keepUpdated} 
                        sendLocation={getLocalFileData} 
                        ViewerIsOn={ViewerIsOn}
                        setViewerOn={setViewerOn}
                    />
                </span>
            </div>
        </>
    )
}

export default MainPage;