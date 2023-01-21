import React from 'react'
import { Peer } from "peerjs";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

const Main = () => {

    const [callId,setcallId] = useState('')
    const [messageGoing,setmessageGoing] = useState('')
    const [id, setid] = useState()
    const tempMsgData = []
    const [msgReciveData, setmsgReciveData] = useState([])
    const [msgSendData, setmsgSendData] = useState([])
    const peerInstance = useRef(null)

    
    
   
    const saveMsg = useCallback(
        (data) => {
            tempMsgData.push(data)
            setmsgReciveData([...tempMsgData])
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
    const message = (remoteId,sendData) => {
        const conn = peerInstance.current.connect(remoteId);
        conn.on("open", () => {
            conn.send(sendData);
        });
        conn.on("data", (data) => {
            console.log(data);
            setmsgReciveData([...msgReciveData,data])
            console.log(msgReciveData);
        });
    }

    const setMessage = ()=> {
        if(callId !== "" && messageGoing !== ""){
            setmsgSendData([...msgSendData, messageGoing])
            message(callId,messageGoing)
        }
    }

 


    return (
       <>
             <div className='video'>
            <h3>{id}</h3>
            <br />
            <input type="text" value={callId} placeholder="Calling ID" onChange={(e)=>setcallId(e.target.value)}/>
            <input type="text" value={messageGoing} placeholder="Enter Message" onChange={(e)=>setmessageGoing(e.target.value)} />
            <button onClick={setMessage} >connect</button>
            
           
            

        </div>
        <div className='video'>
            <ul>
                <h1>sending</h1>
                {
                    msgSendData.map((e,id)=>{
                        return(
                            <li key={id} >{e}</li>
                        )
                    })
                }

            </ul>
           <h1>--------</h1>
        <ul>
            <h1>reciving</h1>
                {
                    msgReciveData.map((e,id)=>{
                        return(
                            <li key={id} >{e}</li>
                        )
                    })
                }
            </ul>
        </div>
       </>
    )
}

export default Main