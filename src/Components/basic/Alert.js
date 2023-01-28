import React, { useEffect } from 'react'
import { useState } from 'react'

const Alert = (props) => {
    if(props.show){
        setTimeout(()=>{
            props.setShow([false,""])
        },3000)
    }
    
    return (
        <>
            {
                props.show &&
                <div className="alert">
                    <p>{props.text}</p>
                </div>
            }
        </>
    )
}

export default Alert