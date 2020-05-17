import WithLayout from "../components/MainLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import styles from "./../styling/Home.module.css";

const CREATE_ROOM = gql`
    mutation CreateRoom($owner: String!) {
        createRoom(owner: $owner) {
            roomIdShort
        }
    }
`;

const Landing = (props) => {
    const [state, setState] = useContext(UserContext);
    const router = useRouter();
    const [createRoom, { loading, error }] = useMutation(CREATE_ROOM, {
        onCompleted({ createRoom }) {
            router.push("/room/" + createRoom.roomIdShort);
        },
    });
    return (
        <React.Fragment>
            <div className={styles.background}>
                <div className={styles.landingContainer}>
                    <div className={styles.containerBackground}>
                        <h1>Welcome to Pikku1</h1>
                        <h3>Sed commodo elementum elit ac iaculis.</h3>
                        {/* <button>
                            <Link href="/create">
                                <a style={linkStyle}></a>
                            </Link>
                        </button> */}
                        <button
                            className={styles.linkStyle}
                            onClick={(e) => {
                                e.preventDefault();
                                createRoom({
                                    variables: {
                                        owner: state.firebase.auth().currentUser
                                            .email,
                                    },
                                });
                            }}
                        >
                            Create Room
                        </button>
                        <button className={styles.linkStyle}>
                            <Link href="/join">
                                <a>Join Room</a>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default WithLayout(Landing);
