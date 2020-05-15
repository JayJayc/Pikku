import Router, { useRouter } from "next/router";
import { useState } from "react";
import { Query } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import WithLayout from "../components/MainLayout";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import styles from "./../styling/Main.module.css";

const CREATE_ROOM = gql`
    mutation CreateRoom($owner: String!) {
        createRoom(owner: $owner) {
            roomIdShort
        }
    }
`;

const createRoomPage = () => {
    const [state, setState] = useContext(UserContext);
    const router = useRouter();
    const [createRoom, { loading, error }] = useMutation(CREATE_ROOM, {
        onCompleted({ createRoom }) {
            router.push("/room/" + createRoom.roomIdShort);
        },
    });

    return (
        <React.Fragment>
            <h1>Create</h1>
            <p>This is the blog post content.</p>
            <label htmlFor="range">Range</label>
            <input type="range" id="vol" name="range" min="0" max="10"></input>
            <label htmlFor="area">Area</label>
            <input type="text" id="area" name="area" />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    createRoom({ variables: { owner: state.email } });
                }}
            ></button>
        </React.Fragment>
    );
};
export default WithLayout(createRoomPage);
