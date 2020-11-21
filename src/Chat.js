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
    const [roomOwner, setRoomOwner] = useState("")
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState(['']);
    const [partner, setPartner] = useState("")
    

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => (
                (setRoomName(snapshot.data().name),
                    (setRoomOwner(snapshot.data().roomOwner),
                    (setPartner(snapshot.data().partner))
                    ))));

            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))))
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        if (roomId && input.length > 0) {
            db.collection("rooms").doc(roomId).collection("messages").add({
                sender: currentUser.email,
                roomOwner: roomOwner,
                reciever:currentUser.email===roomOwner?partner:roomOwner,
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()

            })
        } else {
            alert("create a room or say something")
        }
        setInput('');
    }

    const addPartner =()=>{
        const friend = prompt("Please enter friends email for this chat room");
        if(friend){
            db.collection('rooms').doc(roomId).set({
                partner : friend
            }, {merge: true});
        }
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
                            messages.length !== 0 ? new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString() : "No message"
                        }
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon onClick={addPartner}/>
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
                    <p className={`chat__message ${message.sender === currentUser.email && "chat__reciever"}`}><span className="chat__name">{message.sender?message.sender:message.reciever}</span>{message.message}
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
