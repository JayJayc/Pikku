import { useRouter } from "next/router";
import WithLayout from "../../components/Layout/MainLayout";
import gql from "graphql-tag";
import { useSubscription, useQuery } from "@apollo/react-hooks";
import styles from "./../../styling/Room.module.css";
import PlayersList from "../../components/RoomComponents/PlayersList";
import RestaurantList from "../../components/RoomComponents/RestaurantsList";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const ROOM_QUERY = gql`
    {
        rooms {
            owner
            roomId
            roomIdShort
            roomStatus
            roomURL
            numberOfPlayers
            players
            restaurants {
                adr_address
                business_status
                formatted_address
                formatted_phone_number
                name
                opening_hours {
                    open_now
                    weekday_text
                }
                photos
                price_level
                rating
                reference
                reviews {
                    author_name
                    author_url
                    language
                    profile_photo_url
                    rating
                    relative_time_description
                    text
                    time
                }
                scope
                types
                url
                user_ratings_total
                utc_offset
                utc_offset_minutes
                vicinity
                website
                votes
            }
            openDate
            closeDate
            winner
        }
    }
`;
const ROOM_SUBSCRIPTION = gql`
    subscription RoomUpdate($roomIdShort: String!) {
        roomUpdate(roomIdShort: $roomIdShort) {
            roomIdShort
            numberOfPlayers
            owner
            roomURL
            players
            roomStatus
            restaurants {
                adr_address
                business_status
                formatted_address
                formatted_phone_number
                name
                opening_hours {
                    open_now
                    weekday_text
                }
                photos
                price_level
                rating
                reference
                reviews {
                    author_name
                    author_url
                    language
                    profile_photo_url
                    rating
                    relative_time_description
                    text
                    time
                }
                scope
                types
                url
                user_ratings_total
                utc_offset
                utc_offset_minutes
                vicinity
                website
                votes
            }
        }
    }
`;
const ReactSwing = dynamic(import("react-swing"), { ssr: false });

const Room = () => {
    const router = useRouter();
    const { roomId } = router.query;
    const [roomData, setRoomData] = useState();
    const [stack, setStack] = useState();
    const queryResponse = useQuery(ROOM_QUERY);
    const stackEl = useRef();

    useEffect(() => {
        if (queryResponse.data) {
            console.log(JSON.parse(JSON.stringify(queryResponse.data.rooms)));
            setRoomData(
                JSON.parse(JSON.stringify(queryResponse.data.rooms))[0]
            );
        }
    }, [queryResponse.data]);

    const { data, loading, error } = useSubscription(ROOM_SUBSCRIPTION, {
        variables: { roomIdShort: roomId },
    });
    useEffect(() => {
        if (data) {
            setRoomData(data.roomUpdate);
        }
    }, [data]);
    const handleStartVoting = () => {};
    if (
        roomData &&
        roomData.roomStatus === "VOTING" &&
        typeof window !== "undefined"
    ) {
        return (
            <React.Fragment>
                <div className={styles.viewport}>
                    <ReactSwing
                        className={styles.stack}
                        setStack={(stack) => {
                            console.log("Stack", stack);
                            setStack({ stack: stack });
                        }}
                        ref={stackEl}
                        throwout={(e) => {
                            console.log(e);
                            e.target.setAttribute("style", "display:none");
                        }}
                    >
                        {roomData.restaurants.map((restaurant, index) => {
                            if (index === 0) {
                                // first one
                                return (
                                    <li
                                        ref={"card" + index}
                                        throwout={(e) => {
                                            console.log("last one");
                                            // Show message to wait while thier friends finish voting
                                        }}
                                    >
                                        {restaurant.name}
                                    </li>
                                );
                            } else {
                                // not first one
                                return (
                                    <li ref={"card" + index}>
                                        {restaurant.name}
                                    </li>
                                );
                            }
                        })}
                    </ReactSwing>
                </div>
            </React.Fragment>
        );
    } else if (roomData && roomData.roomStatus === "CLOSED") {
        return <React.Fragment>closed</React.Fragment>;
    } else {
        return (
            <React.Fragment>
                <div className={styles.roomIdContainer}>
                    <div className={styles.roomId}>Room: {roomId}</div>
                    <div className={styles.shareId}>Click to share</div>
                </div>
                <div className={styles.mainContainer}>
                    <PlayersList data={roomData} />
                    <RestaurantList data={roomData} />
                    <button onClick={handleStartVoting}>start</button>
                </div>
                {error ? console.log(error) : null}
                {console.log(roomData)}
            </React.Fragment>
        );
    }
};
export default WithLayout(Room);
