import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import axios from "axios";
import "./css/MainPage.css";
import "./css/LHS.css";
import "./css/RHS.css";
import LHS from "./LHS";
import RHS from "./RHS";

const MainPage = () => {

    const [data, setData] = useState([])
    const [keepUpdated, setKeepUpdating] = useState([])
    const [basePath, setBasePath] = useState("")

    useEffect(()=>{

    },[])

    const getLocalFileData = async (path, type = null) => {

        let res = await axios.post(
            "http://localhost:4040/get-location",
            {url: path}
        );
        console.log(res.data)
        if(res.data.success){
            if(type == "oneTime"){
                
                setBasePath(path)
                setData(res.data.directoryInfo);
                setKeepUpdating(res.data.directoryInfo)
            } else {
                setKeepUpdating(res.data.directoryInfo)
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
                    />
                </span>
                <span className="RHS-body">
                    <RHS 
                        path={basePath} 
                        data={keepUpdated} 
                        sendLocation={getLocalFileData} 
                    />
                </span>
            </div>
        </>
    )
}

export default MainPage;