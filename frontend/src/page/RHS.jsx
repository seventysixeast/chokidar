import React from "react";
import {Breadcrumb} from "react-bootstrap"
import { FaRegFileLines } from "react-icons/fa6";
import { Fa500Px, FaRegMoon, FaFolder, FaFolderOpen } from "react-icons/fa";
const RHS = ({
    path,
    data = [],
    sendLocation
}) => {
    return(
        <div className="main-container">
            <h1>Server</h1>
            <Breadcrumb>
                <Breadcrumb.Item href="#">E:</Breadcrumb.Item>
                {/* <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item> */}
                <Breadcrumb.Item active>server</Breadcrumb.Item>
            </Breadcrumb>
            <div className="file-body">

                {
                    data.map(d=> {
                        if(d.type == "file"){
                            return <div style={{
                                textAlign: "center",
                                margin:"0 12px",
                                width: "60px",
                                wordBreak: "break-word"
                            }}> <span style={{
                                fontSize: "40px",
                                color: "#72d400",
                            }}><FaRegFileLines /></span>
                            <br />
                            <span style={{
                                fontSize: "14px",
                                fontWeight: "600"
                            }}>{d.name}</span>
                        </div>
                        } else {
                            return <div style={{
                                textAlign: "center",
                                margin:"0 12px",
                                width: "60px",
                                wordBreak: "break-word"
                            }}> <span style={{
                                fontSize: "40px",
                                color: "#72d400",
                            }}><FaFolder /></span> 
                            ({d.count})
                            <br />
                            <span style={{
                                fontSize: "14px",
                                fontWeight: "600"
                            }}>{d.name}</span>
                        </div>
                        }
                    })
                }



                
                
            </div>
        </div>
    )
}

export default RHS;