import { useRouter } from "next/router";
import WithLayout from "../../components/Layout/MainLayout";
import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";
import styles from "./../../styling/Room.module.css";

const PlayersList = (props) => {
    const data = props.data;
    if (data) {
        if (data.roomUpdate.numberOfPlayers > 1) {
            return (
                <React.Fragment>
                    <p>Voters: {data.roomUpdate.numberOfPlayers}</p>
                    <div>
                        {data.roomUpdate.players.map((player) => {
                            return player;
                        })}
                    </div>
                </React.Fragment>
            );
        }
    }
    return (
        <h2 className={styles.waitingMessage}>
            Waiting for more voters to join...
        </h2>
    );
};

const Room = () => {
    const router = useRouter();
    const { roomId } = router.query;
    const ROOM_SUBSCRIPTION = gql`
        subscription RoomUpdate($roomIdShort: String!) {
            roomUpdate(roomIdShort: $roomIdShort) {
                roomIdShort
                numberOfPlayers
                owner
                roomURL
                players
                restaurants {
                    name
                }
            }
        }
    `;
    const { data, loading, error } = useSubscription(ROOM_SUBSCRIPTION, {
        variables: { roomIdShort: roomId },
    });
    // if (loading) return "loading";
    // if (error) return <React.Fragment>{console.log(error)}</React.Fragment>;
    return (
        <React.Fragment>
            <div className={styles.roomIdContainer}>
                <div className={styles.roomId}>Room: {roomId}</div>
                <div className={styles.shareId}>Click to share</div>
            </div>
            <div className={styles.mainContainer}>
                <PlayersList data={data} />
                <div className={styles.playersContainer}>
                    <p>stuff....</p>
                </div>

                <button>start</button>
            </div>
            {error ? console.log(error) : null}
            {console.log(data)}
        </React.Fragment>
    );
};
export default WithLayout(Room);
