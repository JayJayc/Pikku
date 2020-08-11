import { useRouter } from "next/router";
import { useState } from "react";
import WithLayout from "../components/MainLayout";
import Link from "next/link";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";

const landingContainer = {
    width: "60%",
    minWidth: "350px",
    maxWidth: "600px",
    /* margin: 0 auto; */
    paddingTop: "20vh",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
};
const linkStyle = {
    // marginRight: "15px",
};
const containerBackground = {
    margin: 0,
    paddingTop: 10,
    borderStyle: "groove",
    opacity: 0.8,
};
const formTextInput = {
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10,
};
const joinButton = {
    margin: 10,
    textAlign: "center",
};

const JOIN_ROOM = gql`
    mutation joinRoom($roomIdShort: String!, $user: String!) {
        joinRoom(roomIdShort: $roomIdShort, user: $user)
    }
`;

const createRoom = () => {
    const router = useRouter();
    const [state, setState] = useContext(UserContext);
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const firebase = state.firebase;

    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;
        var name;

        if (user != null) {
            name = user.displayName;
        }
        console.log(name);
        // if (user) {
        //     setLoginText("Hi, " + user.email);
        // } else {
        //     setLoginText("Login");
        // }
    });
    const [joinRoom, { loading, error }] = useMutation(JOIN_ROOM, {
        onCompleted({ joinRoom }) {
            console.log(joinRoom);
            router.push("/room/" + roomId);
        },
    });
    return (
        <React.Fragment>
            <div style={landingContainer}>
                <div style={containerBackground}>
                    <h1>Join a room</h1>
                    <div style={formTextInput}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div style={formTextInput}>
                        <label htmlFor="roomIdShort">Room ID:</label>
                        <input
                            type="text"
                            id="roomIdShort"
                            name="roomIdShort"
                            value={roomId}
                            onChange={(e) => {
                                setRoomId(e.target.value);
                            }}
                        ></input>
                    </div>
                    <button
                        style={joinButton}
                        onClick={(e) => {
                            e.preventDefault();
                            try {
                                joinRoom({
                                    variables: {
                                        roomIdShort: roomId,
                                        user: name,
                                    },
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    >
                        <Link href="/join">
                            <a style={linkStyle}>Join Room</a>
                        </Link>
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};
export default WithLayout(createRoom);
