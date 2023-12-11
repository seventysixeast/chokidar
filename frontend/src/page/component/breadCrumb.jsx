import React, { useEffect, useState } from "react";

const Breadcrumb = ({bread = [], sendLocation, setViewerOn, basePath}) => {


    const [curmb, setCurmb] = useState([])

    useEffect(() =>{
        let create = [];
        create = basePath.split("\\");
        create.pop();
        setCurmb(create);
    },[basePath])

    const findUrl = async (i) => {
        let create = bread.slice(0, i+1).join("\\");
        sendLocation(create);
        setViewerOn(false)
    }

    return (
        <div className="container-box">
            {
                bread.map((d, index) => {

                    let a = d.split(".");

                    if(curmb[index] !== d){
                        if(index == 0){
                            return <span key={"bread-"+index}>{d}</span>
                        } else {
                            return <> 
                            <span 
                            key={"bread-"+index} 
                            onClick={()=>{
                                if(a[a.length-1] !== "txt"){
                                    findUrl(index)
                                }
                            }} 
                            className={`bStyle ${
                                bread.length-1 === index ? 
                                "bPointer":
                                ""
                            }`}> &#62; {d}</span></>
                        }
                    }
                })
            }
        </div>
    )

    // return (
    //     <div class="container">
    //         <ul class="breadcrumb">

    //             {
    //                 bread.map((d, index) => {
    //                     if(index == 0 ){
    //                         return (
    //                             <li class="breadcrumb__item" key={"bread-"+index}>
    //                                 <span class="breadcrumb__inner">
    //                                     <span class="breadcrumb__title">{d}</span>
    //                                 </span>
    //                             </li>  
    //                         )
    //                     } else {
    //                         return (
    //                             <li class="breadcrumb__item" key={"bread-"+index} onClick={()=>findUrl(index)}>
    //                                 <span class="breadcrumb__inner">
    //                                     <span class="breadcrumb__title">{d}</span>
    //                                 </span>
    //                             </li>  
    //                         )
    //                     }
    //                 }
                          
    //                 )
    //             }

    //         </ul>
    //     </div>
    // )
}

export default Breadcrumb;