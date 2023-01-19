import React from 'react'
import { Peer } from "peerjs";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

const Main = () => {

    const input = useRef(null)
    const videoComming = useRef(null)
    const messageGoing = useRef(null)
    const [id, setid] = useState()
    const [msgData, setmsgData] = useState([])
    const peerInstance = useRef(null)

   
    

    useEffect(() => {
        const peer = new Peer();
        peer.on('open', (id) => {
            setid(id)
            console.log('My peer ID is: ' + id);
        });

        //reciver
        peer.on("connection", (conn) => {
            conn.on("data", (data) => {
                console.log(data);
                setmsgData(msgData.push(data))
                console.log(msgData);
            });
            conn.on("open", () => {
                conn.send("hello!");
            });
        });

        peerInstance.current = peer

    }, [])
    //connect 
    const message = (remoteId) => {
        const conn = peerInstance.current.connect(remoteId);
        conn.on("open", () => {
            conn.send("hi hello!");
        });
        conn.on("data", (data) => {
            console.log(data);
            setmsgData([...msgData,data])
            console.log(msgData);
        });
    }

 


    return (
        <div className='video'>
            <h3>{id}</h3>
            <br />
            <input type="text" ref={input} />
            <button onClick={() => message(input.current.value)} >connect</button>
            <input type="text" ref={messageGoing} />
            

        </div>
    )
}

export default Main