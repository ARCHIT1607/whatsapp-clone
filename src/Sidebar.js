import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SideBarChat from './SideBarChat';
import db from './Firebase';
import { userContext } from './UserContext';
import firebase from 'firebase';

function Sidebar() {

    const currentUser = useContext(userContext);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>(
          setRooms(snapshot.docs.map(doc =>(
              {
                  id:doc.id,
                  data:doc.data()
              }
          )))
      )
      );

      return ()=>{
          unsubscribe();
      }
    }, [])

    const logout = () => {
        firebase.auth().signOut();
    }


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={currentUser?.photoURL}/>
                <p>{currentUser.displayName}</p>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <Button onClick={logout}>Logout</Button>
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className ="sidebar__searchContainer">
                <SearchOutlinedIcon/>
                <input placeholder = "Start new chat"  type ="text"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SideBarChat addNewChat />
                {
                    rooms.map(room =>(
                        <SideBarChat key ={room.id} id={room.id} name={room.data.name}/>
                    ))
                    }
            </div>
        </div>
    )
}

export default Sidebar
