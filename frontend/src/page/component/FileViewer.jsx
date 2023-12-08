import React, {useEffect, useState} from "react";
import axios from "axios";
const FileViewer = ({location}) => {

    const [lct, setLct] = useState("")
    
    useEffect(()=>{
        loadFile()
    },[location])

    const loadFile = async () => {
        let res = await axios.post(
            "http://localhost:4040/read-file",
            {url: location}
        );

        if(res.data.success){
            // res.data.fileInfo 
            let a = res.data.content;
            console.log(a)
            setLct(a);

        }
        

    }

    return(
        <div style={{
            border: "solid 1px #cbcbcb",
            padding: "10px"
        }}>

            <pre>{lct}</pre>

        </div>
    )

}

export default FileViewer;