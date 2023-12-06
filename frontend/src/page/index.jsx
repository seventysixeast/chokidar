import React from "react";
import {Row, Col} from "react-bootstrap";
import "./css/MainPage.css";
import "./css/LHS.css";
import "./css/RHS.css";
import LHS from "./LHS";
import RHS from "./RHS";
const MainPage = () => {
    return(
        <>
            <div className="containers">
                <span className="LHS-body">
                    <LHS />
                </span>
                <span className="RHS-body">
                    <RHS />
                </span>
            </div>
        </>
    )
}

export default MainPage;