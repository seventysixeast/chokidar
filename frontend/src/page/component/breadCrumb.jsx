import React from "react";

const Breadcrumb = ({bread = [], sendLocation, setViewerOn}) => {

    const findUrl = async (i) => {
        let create = bread.slice(0, i+1).join("\\");
        sendLocation(create);
        setViewerOn(false)
    }

    return (
        <div class="container">
            <ul class="breadcrumb">

                {
                    bread.map((d, index) => {
                        if(index == 0 ){
                            return (
                                <li class="breadcrumb__item" key={"bread-"+index}>
                                    <span class="breadcrumb__inner">
                                        <span class="breadcrumb__title">{d}</span>
                                    </span>
                                </li>  
                            )
                        } else {
                            return (
                                <li class="breadcrumb__item" key={"bread-"+index} onClick={()=>findUrl(index)}>
                                    <span class="breadcrumb__inner">
                                        <span class="breadcrumb__title">{d}</span>
                                    </span>
                                </li>  
                            )
                        }
                    }
                          
                    )
                }

            </ul>
        </div>
    )
}

export default Breadcrumb