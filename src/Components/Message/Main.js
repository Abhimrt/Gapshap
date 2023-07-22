import React from 'react'
import { Peer } from "peerjs";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import Alert from '../basic/Alert';

const Main = () => {

    const [callId, setcallId] = useState('')
    const [messageGoing, setmessageGoing] = useState('')
    const [id, setid] = useState()
    const MsgData = useRef([])
    const [msgData, setmsgData] = useState([])
    const [alert, setalert] = useState([false,""])
    const peerInstance = useRef(null)






    const saveMsg = useCallback(
        (data) => {
            MsgData.current.push(data)
            setmsgData([...MsgData.current])
            scrollToBottom();
        },
        [],
    )


    useEffect(() => {
        const peer = new Peer(Math.random()*10000 | 0);
        peer.on('open', (id) => {
            setid(id)
        });

        //reciver
        peer.on("connection", (conn) => {
            setcallId(conn.peer)
            setalert([true,"New Message!!"])
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
            scrollToBottom();
        }
    }

    const copyText = ()=>{
        navigator.clipboard.writeText(id)
        setalert([true,"Text Copied!!"])
    }

    const scrollToBottom = () => {
        const element = document.getElementById("messages");
        // element.scrollTop = element.scrollHeight+500;
        element.scroll({ top: element.scrollHeight*2, behavior: 'smooth' })
        console.log(element.scrollHeight)
    }
   

    return (
        <>
        <Alert
            show = {alert[0]}
            setShow ={setalert}
            text = {alert[1]}
        />

            <div className="message">

                {/* editor start */}
                <div className='editor '>
                    <div className='center'>
                        <strong>{id}</strong>
                        <button onClick={copyText}>copy</button>
                    </div>
                    <br />
                    <div className='center col'>
                        <input type="text" value={callId} placeholder="Calling ID" onChange={(e) => setcallId(e.target.value)} />
                        <input type="text" value={messageGoing} placeholder="Enter Message" onKeyDownCapture={(e)=>e.key=="Enter"?setMessage():null} onChange={(e) => setmessageGoing(e.target.value)} />
                        <button onClick={setMessage} >Connect and Send</button>
                    </div>
                </div>
                {/* editor end */}

                <div className="inbox" >
                    <ul id='messages' >

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