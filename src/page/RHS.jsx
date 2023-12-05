import React from "react";
import {Breadcrumb} from "react-bootstrap"

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
                    backgroundColor: "red",
                    width: "100px",
                    height: "100px"
                }}>red</div>
                <div style={{
                    backgroundColor: "red",
                    width: "100px",
                    height: "100px"
                }}>red</div>
                <div style={{
                    backgroundColor: "red",
                    width: "100px",
                    height: "100px"
                }}>red</div>
            </div>
        </div>
    )
}

export default RHS;