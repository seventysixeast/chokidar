import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import axios from "axios";
import io from 'socket.io-client';// Included client side socket io
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
    const [selectedDirectory, setSelectedDirectory] = useState(null);
    useEffect(()=>{
        const socket = io('http://localhost:4040');

        // Event listener for 'selectedDirectory' event(when home directory is selected)
        socket.on('selectedDirectory', ({ selectedDirectory }) => {
          console.log('Received selected directory:', selectedDirectory);
          setSelectedDirectory(selectedDirectory);
        });
    
        // Bleow is Event listener for 'directoryChange' event
        socket.on('directoryChange', ({ event, path }) => {
          console.log('Directory change event:', event, path);
          // Vishal add any code to be executed on directory change here
        });
    
        return () => {
          socket.disconnect();
        };
    },[])

    const getLocalFileData = async (path, type = null) => {

        let res = await axios.post(
            "http://localhost:4040/get-location",
            {url: path}
        );
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
                    />
                </span>
                <span className="RHS-body">
                    <RHS 
                        basePath={basePath}
                        updatedPath={updatedPath} 
                        data={keepUpdated} 
                        sendLocation={getLocalFileData} 
                    />
                </span>
            </div>
        </>
    )
}

export default MainPage;