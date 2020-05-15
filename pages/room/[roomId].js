import { useRouter } from "next/router";
import WithLayout from "../../components/MainLayout";
import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";

const roomIdContainer = {
    position: "absolute",
    width: "10%",
    minWidth: "175px",
    maxWidth: "250px",
    /* margin: 0 auto; */
    marginTop: "90px",
    marginRight: "70px",
    textAlign: "center",
    right: 0,
    top: 0,
    paddingLeft: 25,
    paddingRight: 25,
    border: "5px solid black",
};

const mainContainer = {
    width: "60%",
    minWidth: "350px",
    maxWidth: "600px",
    /* margin: 0 auto; */
    marginTop: "25vh",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
};

const Room = () => {
    const router = useRouter();
    const { roomId } = router.query;
    const ROOM_SUBSCRIPTION = gql`
        subscription RoomUpdate($roomIdShort: String!) {
            roomUpdate(roomIdShort: $roomIdShort) {
                roomIdShort
                numberOfPlayers
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
            Room: {roomId}
            {error ? console.log(error) : null}
            {console.log(data)}
        </React.Fragment>
    );
    // <React.Fragment>
    //     <div style={roomIdContainer}>
    //         <h4>New comment: {!loading && console.log(roomUpdate)}</h4>
    //         <h1>Room ID: {roomId}</h1>
    //         <p>Click to copy URL</p>
    //     </div>
    //     <div style={mainContainer}>
    //         <h2>Waiting for more voters to join...</h2>
    //         <p>stuff....</p>
    //         <button>start</button>
    //     </div>
    // </React.Fragment>
};
export default WithLayout(Room);
