import React, {useEffect, useState} from "react";
import DocViewer from "react-doc-viewer";
const FileViewer = ({location}) => {

    const [lct, setLct] = useState([{uri: ""}])
    console.log(location);

    useEffect(()=>{
        let a = location.split("\\")
        a = a.join("/");
        console.log(a);
        // setLct([{uri: require(a)}])
    },[location])

    return(
        <>
           {/* <DocViewer documents={[{uri: require("E:/RProject/axxonlab/dist/win-unpacked/LICENSE.electron.txt")}]} /> */}
        </>
    )

}

export default FileViewer;