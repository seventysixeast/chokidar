import React from "react";
import {Breadcrumb} from "react-bootstrap"
import { FaRegFileLines } from "react-icons/fa6";
import { Fa500Px, FaRegMoon, FaFolder, FaFolderOpen } from "react-icons/fa";
const RHS = () => {
    return(
        <div className="main-container">
            <h1>File Name</h1>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
            <div className="file-body">

                <div style={{
                        textAlign: "center",
                        margin:"0 12px"
                    }}> <span style={{
                        fontSize: "40px",
                        color: "#72d400",
                    }}><FaFolder /></span> ( 6 )
                    <br />
                    <span style={{
                        fontSize: "14px",
                        fontWeight: "600"
                    }}>Folder Name</span>
                </div>

                <div style={{
                        textAlign: "center",
                        margin:"0 12px"
                    }}> <span style={{
                        fontSize: "40px",
                        color: "#72d400",
                    }}><FaRegFileLines /></span> 
                    ( 6 )
                    <br />
                    <span style={{
                        fontSize: "14px",
                        fontWeight: "600"
                    }}>FileName.txt</span></div>
                
            </div>
        </div>
    )
}

export default RHS;