import React from "react";
import { Peer } from "peerjs";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Alert from "../basic/Alert";

const Main = () => {
  const input = useRef(null);
  const videoComming = useRef(null);
  const videoGoing = useRef(null);
  const [id, setid] = useState();
  const peerInstance = useRef(null);
  const [alert, setalert] = useState([false, ""]);

  useEffect(() => {
    const peer = new Peer((Math.random() * 10000) | 0);
    peer.on("open", (id) => {
      setid(id);
      console.log("My peer ID is: " + id);
    });

    peer.on("call", (call) => {
      if (
        window.confirm(
          `${call.peer} is calling you. Do you want to join the call`
        )
      ) {
        var getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;
        getUserMedia({ audio: true }, (stream) => {
          call.answer(stream);
          input.current.value = call.peer;
          call.on("stream", (remoteStream) => {
            videoComming.current.srcObject = remoteStream;
            videoComming.current.play();
          });
          setalert([true, "Connection built"]);
        });
      }
    });
    peerInstance.current = peer;
  }, []);
  const call = (remoteId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
      setalert([true, "Requesting for Call"]);
    getUserMedia(
      { audio: true },
      (stream) => {
        var call = peerInstance.current.call(remoteId, stream);
        call.on("stream", (remoteStream) => {
          videoComming.current.srcObject = remoteStream;
          videoComming.current.play();
          setalert([true, "Connection built"]);
        });
        setTimeout(() => {
            if (!call.open) {
              setalert([true, "Connection not built request again"]);
            }
          }, 20000);
      },
      (err) => {
        console.log("Failed to get local stream", err);
      }
    );
  };

  const copyText = () => {
    navigator.clipboard.writeText(id);
    setalert([true, "Text Copied!!"]);
  };

  return (
    <>
      <Alert show={alert[0]} setShow={setalert} text={alert[1]} />
      <div className="video ">
        <div className="center">
          <strong>{id}</strong>
          <button onClick={copyText}>copy</button>
        </div>
        <div className="center">
          <input type="text" ref={input} placeholder="Enter Sender's Id" />
          <button onClick={() => call(input.current.value)}>connect</button>
        </div>
        <div className="center">
          <audio ref={videoComming}></audio>
          <audio ref={videoGoing}></audio>
        </div>
      </div>
    </>
  );
};

export default Main;
