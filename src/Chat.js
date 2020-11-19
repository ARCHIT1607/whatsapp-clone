import React, { useContext, useEffect, useState } from 'react'
import './Chat.css';
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './Firebase';
import { userContext } from './UserContext';
import firebase from "firebase";

function Chat() {

    const currentUser = useContext(userContext);
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("")
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name
                )
            ));

            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))))
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            name:currentUser.displayName,
            message:input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            
        }) 
        setInput('');
    }


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen
                        {" "}
                        {
                            new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                        } 
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${
                        message.name === currentUser.displayName && "chat__reciever"}`}><span className="chat__name">{message.name}</span>{message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}


            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" placeholder=" type a message" value={input} onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
