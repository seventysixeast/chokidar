import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import axios from "axios";
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
    useEffect(()=>{

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