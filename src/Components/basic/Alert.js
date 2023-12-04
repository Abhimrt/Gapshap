import React from 'react'


const Alert = (props) => {
    if (props.show) {
        setTimeout(() => {
            props.setShow([false, ""])
        }, 5000)
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