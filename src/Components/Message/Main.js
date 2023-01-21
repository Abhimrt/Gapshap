import React from 'react'
import { Peer } from "peerjs";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

const Main = () => {

    const [callId, setcallId] = useState('')
    const [messageGoing, setmessageGoing] = useState('')
    const [id, setid] = useState()
    const MsgData = useRef([])
    const [msgData, setmsgData] = useState([])
    const peerInstance = useRef(null)






    const saveMsg = useCallback(
        (data) => {
            MsgData.current.push(data)
            setmsgData([...MsgData.current])
        },
        [],
    )


    useEffect(() => {
        const peer = new Peer();
        peer.on('open', (id) => {
            setid(id)
        });

        //reciver
        peer.on("connection", (conn) => {
            setcallId(conn.peer)
            conn.on("data", (data) => {
                saveMsg(data);
            });
        });

        peerInstance.current = peer


    }, [saveMsg])
    //connect 
    const message = (remoteId, sendData) => {
        const conn = peerInstance.current.connect(remoteId);
        conn.on("open", () => {
            conn.send(sendData);
        });
        conn.on("data", (data) => {
            console.log(data, "--a");
        });
    }

    const setMessage = () => {
        if (callId !== "" && messageGoing !== "") {
            MsgData.current.push(`${messageGoing}~SEnd~`)
            setmsgData([...MsgData.current])
            message(callId, messageGoing)
            setmessageGoing("")
        }
    }





    return (
        <>

            <div className="message">

                <div className='editor'>
                    <div className='center'>
                        <strong>{id}</strong>
                        <button onClick={()=>navigator.clipboard.writeText(id)}>copy</button>
                    </div>
                    <br />
                    <input type="text" value={callId} placeholder="Calling ID" onChange={(e) => setcallId(e.target.value)} />
                    <input type="text" value={messageGoing} placeholder="Enter Message" onChange={(e) => setmessageGoing(e.target.value)} />
                    <button onClick={setMessage} >connect</button>
                </div>

                <div className="inbox" >
                    <ul >

                        {
                            msgData.map((e, id) => {
                                if (e !== " ") {
                                    if (e.length >= 4 && e.substr(e.length - 6) === "~SEnd~") {
                                        return (<li key={id} className="send" >{e.substr(0, e.length - 6)}</li>)
                                    } else {
                                        return (<li key={id} className="recive" >{e}</li>)
                                    }

                                }
                            })
                        }
                    </ul>
                </div>
            </div>


        </>
    )
}

export default Main