import styles from "./../../styling/Room.module.css";
import AddRestaurantModal from "./AddRestaurantModal";
import { useState, useContext } from "react";

const RestaurantsList = (props) => {
    const data = props.data;
    const [showModal, setShowModal] = useState(false);
    const handleAddNewRestaurant = () => {
        setShowModal(true);
    };
    return (
        <React.Fragment>
            {showModal ? (
                <AddRestaurantModal setShowModal={setShowModal} data={data} />
            ) : null}
            <div className={styles.selectedRestaurants}>
                Selected Restaurants
            </div>
            <div className={styles.playersContainer}>
                {data
                    ? data.restaurants.map((restaurant) => {
                          return (
                              <div className={styles.gridItem}>
                                  {restaurant.name}
                              </div>
                          );
                      })
                    : null}

                <div
                    className={styles.addButton}
                    onClick={handleAddNewRestaurant}
                >
                    <img
                        src={"/images/add.png"}
                        alt="add icon"
                        className={styles.addIcon}
                    />
                    Add New Restaurant
                </div>
            </div>
        </React.Fragment>
    );
};
export default RestaurantsList;
