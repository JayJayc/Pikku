import React, { useState } from "react";
var firebase = require("firebase");

// Configure Firebase.
var config = {
    apiKey: "AIzaSyBYrfQbj4bKnbUGsnYG0xQO8-m_sIjRIWc",
    authDomain: "pikku-275413.firebaseapp.com",
};

if (!firebase.apps.length) {
    try {
        firebase.initializeApp(config);
    } catch (err) {
        console.error("Firebase initialization error raised", err.stack);
    }
}
const UserContext = React.createContext([{}, () => {}]);

const UserProvider = (props) => {
    const [state, setState] = useState({ firebase });
    return (
        <UserContext.Provider value={[state, setState]}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
