import React from "react";
import {Nav} from "react-bootstrap"
import { Fa500Px, FaRegMoon, FaFolder, FaFolderOpen } from "react-icons/fa";

const LHS = () => {

    return(
        <div className="sidebar-container">
            <div className="logo">
                <button className="btn custom-btn1">
                    <Fa500Px />
                </button>
                <span className="logo-name">Chokidar</span>
                {/* <button className="btn theme-switch-button">
                    <FaRegMoon />
                </button> */}
            </div>

            <div style={{
                marginTop: "20px",
                marginBottom: "6px"
            }}>
                <FaFolderOpen /> Main file name
            </div>

            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link className="listing" eventKey="link-0"> <FaFolder /> Active</Nav.Link>
                <Nav.Link className="listing" eventKey="link-1"> <FaFolder /> Link</Nav.Link>
                <Nav.Link className="listing" eventKey="link-2"> <FaFolder /> Link</Nav.Link>
            </Nav>

        </ div>
    )

}

export default LHS