import { Button } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import "./ImageUpload.css";
import { useContext, useState } from 'react';
import db, { storage } from "./Firebase";
import firebase from "firebase";
import { userContext } from "./UserContext";

function ImageUpload({roomId, roomOwner, friend}) {

    const currentUser = useContext(userContext);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };
    
      const handleUpload = () => {

        console.log("roomId ",roomId)
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            //progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(progress);
            setProgress(progress);
          },
          (error) => {
            //Error function
            console.log(error);
            alert(error.message);
          },
          () => {
            // Complete function ....
            console.log("inside oushing to messages")
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                //post image inside db
                db.collection("rooms").doc(roomId).collection("messages").add({
                    sender: currentUser.email,
                    roomOwner: roomOwner,
                    reciever:currentUser.email===roomOwner?friend:roomOwner,
                    imageUrl: url,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                setProgress(0);
                setImage(null);
              });
          }
        );
      };


    return (
        <div className ="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
      <ImageIcon />
      <input type="file" name="photo" className="upload__photo" onChange={handleChange}/>
      <Button onClick={handleUpload} variant="contained" color="primary" className="imageupload__btn">
        Upload
      </Button>
    </div>
    )
}

export default ImageUpload
