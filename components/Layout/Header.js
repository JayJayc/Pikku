import Link from "next/link";
import styles from "./../../styling/Header.module.css";
import Modal from "./LoginModal";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";

// // import NoSsr from "./Login";
// var firebase = require("firebase");

// // Configure Firebase.
// var config = {
//     apiKey: "AIzaSyBYrfQbj4bKnbUGsnYG0xQO8-m_sIjRIWc",
//     authDomain: "pikku-275413.firebaseapp.com",
// };

// if (!firebase.apps.length) {
//     try {
//         firebase.initializeApp(config);
//     } catch (err) {
//         console.error("Firebase initialization error raised", err.stack);
//     }
// }

const linkStyle = {
    marginLeft: 15,
};

const header = {
    top: 0,
    left: 0,
    height: 50,
    width: "100%",
    background: "#BDC3C7",
};

const MenuIcon = (clickedObj) => {
    let src;
    if (clickedObj.clicked) {
        src = "/images/x_close.png";
    } else {
        src = "/images/burger_menu.png";
    }
    return <img className={styles.menuIcon} src={src} alt="my image" />;
};

const NavMenu = (open) => {
    let classNames;
    if (open.clicked) {
        classNames = (styles.navMenu, styles.active);
    } else {
        classNames = styles.navMenu;
    }
    return (
        <div className={classNames}>
            <Link href="/">
                <a style={linkStyle}>Home</a>
            </Link>
            <Link href="/about">
                <a style={linkStyle}>About</a>
            </Link>
        </div>
    );
};

const handleLogin = (loggedIn, setLoggedIn, setShowModal) => {
    console.log(loggedIn);
    if (!loggedIn) {
        setShowModal(true);
    } else {
        firebase
            .auth()
            .signOut()
            .then(function () {
                // Sign-out successful.
                setLoggedIn(false);
            })
            .catch(function (error) {
                console.log(error);
                // An error happened
            });
    }
};

const Header = () => {
    const [menuClicked, setMenuClicked] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loginText, setLoginText] = useState("Login");
    const [state, setState] = useContext(UserContext);

    const firebase = state.firebase;
    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;
        var name;

        if (user != null) {
            try {
                name = user.displayName;
            } catch (err) {
                // User exists but has no name
                console.log(err);
            }
        }
        if (user) {
            setLoggedIn(true);
            setLoginText("Hi, " + name);
        } else {
            setLoggedIn(false);
            setLoginText("Login");
        }
    });
    return (
        <React.Fragment>
            <div style={header}>
                <div className={styles.rightHeaderContainer}>
                    <div
                        onClick={(e) => {
                            handleLogin(loggedIn, setLoggedIn, setShowModal);
                        }}
                        id="firebaseui-auth-container"
                        className={styles.loginMessage}
                    >
                        {loginText}
                    </div>
                    <div
                        className={styles.menuButton}
                        onClick={() => setMenuClicked(!menuClicked)}
                    >
                        <MenuIcon clicked={menuClicked} />
                    </div>
                </div>
            </div>
            {showModal ? (
                <Modal setShowModal={setShowModal} firebase={firebase} />
            ) : null}
            <NavMenu clicked={menuClicked} />
        </React.Fragment>
    );
};

export default Header;
