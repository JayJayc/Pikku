import styles from "./../../styling/LoginModal.module.css";
import { useState } from "react";

const LoginModal = (props) => {
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const handleClose = () => {
        props.setShowModal(false);
    };
    const handleChange = (e) => {
        if (e.target.id === "email") {
            setEmail(e.target.value);
        } else if (e.target.id === "password") {
            setPassword(e.target.value);
        }
    };
    const handleSubmit = () => {
        props.firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                props.setShowModal(false);
            })
            .catch(function (error) {
                alert(error);
            });
    };
    return (
        <React.Fragment>
            <div id="myModal" className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <span className={styles.close} onClick={handleClose}>
                            &times;
                        </span>
                        <h2>Modal Header</h2>
                    </div>
                    <div className={styles.modalBody}>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" onChange={handleChange} />
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            id="password"
                            onChange={handleChange}
                        />

                        <p>Some text in the Modal Body</p>
                        <p>Some other text...</p>
                    </div>
                    <div className={styles.modalFooter} onClick={handleSubmit}>
                        <h3>Modal Footer</h3>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default LoginModal;
