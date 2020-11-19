import React, { useEffect, useState } from 'react'
import './Chat.css';
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

function Chat() {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = (e) =>{
e.preventDefault();
console.log("you typed", input);
    }


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>Chat Room</h3>
                    <p>Last Seen...</p>
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
                <p className={`chat__message ${true &&"chat__reciever"}`}><span className="chat__name">Sunny</span>Hey Guys
                <span className="chat__timestamp">3:552pm</span>
                </p>

            </div>

            <div className="chat__footer">
                    <InsertEmoticonIcon />
                    <form>
                        <input  type ="text" placeholder =" type a message" value = {input} onChange = {(e) => setInput(e.target.value)}
                        />
                        <button type ="submit" onClick ={sendMessage}>Send a message</button>
                    </form>
                    <MicIcon />
            </div>
        </div>
    )
}

export default Chat
