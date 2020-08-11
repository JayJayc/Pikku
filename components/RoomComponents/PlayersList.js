import styles from "./../../styling/Room.module.css";

const PlayersList = (props) => {
    const data = props.data;
    console.log(data);
    if (data) {
        if (data.numberOfPlayers > 1) {
            return (
                <React.Fragment>
                    <p>Voters: {data.numberOfPlayers}</p>
                    <div>
                        {data.players.map((player) => {
                            return player;
                        })}
                    </div>
                </React.Fragment>
            );
        }
    }
    return (
        <React.Fragment>
            <h2 className={styles.waitingMessage}>
                Waiting for more voters to join...
            </h2>
        </React.Fragment>
    );
};
export default PlayersList;
