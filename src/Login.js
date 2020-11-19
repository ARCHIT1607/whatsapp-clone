import React from 'react'
import './Login.css';
import { Button } from "@material-ui/core";
import firebase from "firebase";

function Login() {


    const provider = new firebase.auth.GoogleAuthProvider();

    const signIn = () =>{
        firebase.auth().signInWithPopup(provider);
    }


    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="">
                </img>
            </div>

            <div className="login__text">
                <h1>Sign in to Whatsapp</h1>
            </div>

            <Button type="submit" onClick={signIn}>
                Sign in with google
        </Button>
        </div>
    )
}

export default Login
