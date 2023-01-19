import React from 'react'
import { Peer } from "peerjs";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Main = () => {

    const input = useRef(null)
    const videoComming = useRef(null)
    const videoGoing = useRef(null)
    const [id, setid] = useState()
    const peerInstance = useRef(null)

    useEffect(() => {
        const peer = new Peer();
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
            var call = peerInstance.current.call(remoteId, stream);
            call.on('stream', (remoteStream) => {
                videoComming.current.srcObject = remoteStream
                videoComming.current.play()
            });
        }, (err) => {
            console.log('Failed to get local stream', err);
        });
    }



    return (
        <div className='video'>
            <h3>{id}</h3>
            <br />
            <input type="text" ref={input} />
            <button onClick={() => call(input.current.value)} >connect</button>
            <video ref={videoComming}></video>
            <video ref={videoGoing}></video>
        </div>
    )
}

export default Main