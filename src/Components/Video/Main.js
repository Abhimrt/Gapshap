import React from 'react'
import { Peer } from "peerjs";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Alert from '../basic/Alert';

const Main = () => {

    const input = useRef(null)
    const videoComming = useRef(null)
    const videoGoing = useRef(null)
    const [id, setid] = useState()
    const peerInstance = useRef(null)
    const [alert, setalert] = useState([false,""])

    useEffect(() => {
        const peer = new Peer(Math.random()*10000 | 0);
        peer.on('open', (id) => {
            setid(id)
            console.log('My peer ID is: ' + id);
        });

        peer.on('call', call => {

            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: true, audio: true }, (stream) => {
                call.answer(stream)
                videoGoing.current.srcObject = stream
                videoGoing.current.play()
                videoGoing.current.muted = true
                call.on('stream', (remoteStream) => {
                    videoComming.current.srcObject = remoteStream
                    videoComming.current.play()
                });
            });
        })
        peerInstance.current = peer

    }, [])
    const call = (remoteId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true, audio: true }, (stream) => {
            videoGoing.current.srcObject = stream
            videoGoing.current.play()
            videoGoing.current.muted = true
            var call = peerInstance.current.call(remoteId, stream);
            call.on('stream', (remoteStream) => {
                videoComming.current.srcObject = remoteStream
                videoComming.current.play()
            });
        }, (err) => {
            console.log('Failed to get local stream', err);
        });
    }

    const copyText = ()=>{
        navigator.clipboard.writeText(id)
        setalert([true,"Text Copied!!"])
    }

    return (
        <>
        <Alert
            show = {alert[0]}
            setShow ={setalert}
            text = {alert[1]}
        />
             <div className='video '>
                
             <div className='center'>
                        <strong>{id}</strong>
                        <button onClick={copyText}>copy</button>
            </div>
            <div className="center">
            <input type="text" ref={input} />
            <button onClick={() => call(input.current.value)} >connect</button>
            </div>
            <div className="center">
            <video ref={videoComming} ></video>
            <video ref={videoGoing} style={{width:"10rem"}}></video>
            </div>
        </div> 
       </>
    )
}

export default Main