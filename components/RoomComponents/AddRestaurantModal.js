import styles from "./../../styling/AddRestaurantModal.module.css";
import { useState, useRef, useEffect } from "react";
import MockRestaurant from "./mockRestaurant.json";
import MockRestaurant2 from "./mockRestaurant2.json";
import MockRestaurant3 from "./mockRestaurant3.json";
import Carousel from "@brainhubeu/react-carousel";

import { useContext } from "react";
import { UserContext } from "../UserContext";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const restaurants = [MockRestaurant, MockRestaurant2, MockRestaurant3];
let autoComplete;

const loadScript = (url, callback) => {
    let script = document.createElement("script"); // create script tag
    script.type = "text/javascript";

    // when script state is ready and loaded or complete we will call callback
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (
                script.readyState === "loaded" ||
                script.readyState === "complete"
            ) {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }
    script.id = "googleMapAPI";
    script.src = url; // load by url
    // Stop apending more script tags if google api tag already exists
    if (!document.getElementsByTagName("head")[0].children["googleMapAPI"]) {
        document.getElementsByTagName("head")[0].appendChild(script); // append to head
    }
};

// handle when the script is loaded we will assign autoCompleteRef with google maps place autocomplete
function handleScriptLoad(updateQuery, autoCompleteRef) {
    // assign autoComplete with Google maps place one time
    autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ["(cities)"], componentRestrictions: { country: "us" } }
    );
    autoComplete.setFields(["address_components", "formatted_address"]); // specify what properties we will get from API
    // add a listener to handle when the place is selected
    autoComplete.addListener("place_changed", () =>
        handlePlaceSelect(updateQuery)
    );
}

async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace(); // get place from google api
    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log(addressObject);
}
const AddRestaurantModal = (props) => {
    const [restaurant, setRestaurant] = useState({});
    const autoCompleteRef = useRef(null);
    const [state, setState] = useContext(UserContext);

    const [mockQuery, setMockQuery] = useState("");
    const [showGami, setShowGami] = useState(false);
    const [showABC, setShowABC] = useState(false);
    const [showSamSam, setShowSamSam] = useState(false);
    useEffect(() => {
        // loadScript(
        //     `https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&libraries=places`,
        //     () => handleScriptLoad(setQuery, autoCompleteRef)
        // );
    }, []);

    const handleClose = () => {
        props.setShowModal(false);
    };
    const handleMockSearch = (e) => {
        const gamiValues = ["g", "ga", "gam", "gami"];
        const abcValues = ["a", "ab", "abc"];
        const samSamValues = ["s", "sa", "sam"];
        setMockQuery(e.target.value.toLowerCase());
        if (gamiValues.includes(e.target.value.toLowerCase())) {
            setShowGami(true);
        } else if (abcValues.includes(e.target.value.toLowerCase())) {
            setShowABC(true);
        } else if (samSamValues.includes(e.target.value.toLowerCase())) {
            setShowSamSam(true);
        } else if (e.target.value.toLowerCase() == "") {
            setShowSamSam(false);
            setShowABC(false);
            setShowGami(false);
        }
    };
    const ADD_RESTAURANT = gql`
        mutation addRestaurant(
            $owner: String!
            $roomIdShort: String!
            $restaurant: RestaurantInput!
        ) {
            addRestaurant(
                owner: $owner
                roomIdShort: $roomIdShort
                restaurant: $restaurant
            )
        }
    `;
    const [addRestaurant, { loading, error }] = useMutation(ADD_RESTAURANT, {
        onCompleted({ addRestaurant }) {
            console.log(addRestaurant);
        },
    });
    const handleSubmit = () => {
        console.log(state.firebase.auth().currentUser.email);
        try {
            restaurant.votes = 0;
            addRestaurant({
                variables: {
                    owner: state.firebase.auth().currentUser.email,
                    roomIdShort: props.data.roomIdShort,
                    restaurant: restaurant,
                },
            });
        } catch (err) {
            console.log(err);
        }
    };
    console.log(props.data);
    return (
        <React.Fragment>
            <div id="myModal" className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <span className={styles.close} onClick={handleClose}>
                            &times;
                        </span>
                        <h2>Add More Restaurants</h2>
                    </div>
                    <div className={styles.modalBody}>
                        <input
                            type="text"
                            className={styles.mockSearchBar}
                            placeholder="Search.."
                            value={mockQuery}
                            onChange={handleMockSearch}
                        />
                        <div className={styles.mockSearchBarDropdown}>
                            {showGami ? (
                                <div
                                    className={styles.mockSuggestedResult}
                                    onClick={() => {
                                        setRestaurant(MockRestaurant);
                                        setShowSamSam(false);
                                        setShowABC(false);
                                        setShowGami(false);
                                        setMockQuery("");
                                    }}
                                >
                                    Gami Chicken & Beer
                                </div>
                            ) : null}
                            {showABC ? (
                                <div
                                    className={styles.mockSuggestedResult}
                                    onClick={() => {
                                        setRestaurant(MockRestaurant2);
                                        setShowSamSam(false);
                                        setShowABC(false);
                                        setShowGami(false);
                                        setMockQuery("");
                                    }}
                                >
                                    ABC Chicken
                                </div>
                            ) : null}
                            {showSamSam ? (
                                <div
                                    className={styles.mockSuggestedResult}
                                    onClick={() => {
                                        setRestaurant(MockRestaurant3);
                                        setShowSamSam(false);
                                        setShowABC(false);
                                        setShowGami(false);
                                        setMockQuery("");
                                    }}
                                >
                                    Samsam Korean Chicken and Beer
                                </div>
                            ) : null}
                        </div>
                        {console.log(restaurant)}
                        <div className={styles.restaurantContainer}>
                            {Object.keys(restaurant).length !== 0 ? (
                                <React.Fragment>
                                    <div className={styles.restaurantHeader}>
                                        {restaurant.name}
                                    </div>
                                    <div className={styles.restaurantPhoto}>
                                        <Carousel arrows dots>
                                            <img src={restaurant.photos[0]} />
                                            <img src={restaurant.photos[1]} />
                                            <img src={restaurant.photos[2]} />
                                            <img src={restaurant.photos[3]} />
                                        </Carousel>
                                    </div>
                                    <div className={styles.restaurantLocation}>
                                        {restaurant.formatted_address}
                                    </div>
                                    <div className={styles.restaurantReviews}>
                                        here
                                    </div>
                                </React.Fragment>
                            ) : null}
                        </div>

                        {/* uncomment for google search */}
                        {/* <div className="search-location-input">
                            <input
                                ref={autoCompleteRef}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder="Enter a City"
                                value={query}
                            />
                        </div> */}
                    </div>

                    <div className={styles.modalFooter}>
                        <input
                            type="Submit"
                            value="Add Restaurant"
                            onClick={handleSubmit}
                            className={styles.submitButton}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default AddRestaurantModal;
