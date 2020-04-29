import Router, { useRouter } from "next/router";
import withLayout from "../components/MainLayout";
import { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";

import styles from "./../styling/Main.module.css";

const HERO_QUERY = gql`
    {
        rooms {
            roomIdShort
        }
    }
`;

const CREATE_ROOM = gql`
    mutation LoginUser {
        createRoom(owner: "bob smith")
    }
`;

const createRoom = () => {
    const router = useRouter();
    const [createRoom, { data }] = useMutation(CREATE_ROOM);

    return (
        <React.Fragment>
            <h1>Create</h1>
            <p>This is the blog post content.</p>
            <label for="range">Range</label>
            <input type="range" id="vol" name="range" min="0" max="10"></input>
            <label for="area">Area</label>
            <input type="text" id="area" name="area" />
            <button
                onClick={(e) => {
                    createRoom();
                }}
            ></button>
            {console.log(data)}
            {data ? Router.push("/room") : null}
            {/* <Query query={HERO_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div className={styles.loader} />;
                    if (error) return `Error! ${error}`;
                    // return <div className={styles.loader} />;
                    return <p>{console.log(data)}</p>;
                }}
            </Query> */}
        </React.Fragment>
    );
};
export default withLayout(createRoom);
