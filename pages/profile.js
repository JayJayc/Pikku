const handleSetName = () => {
    firebase
        .auth()
        .currentUser.updateProfile({
            displayName: "Bob Smith",
        })
        .then(function () {
            console.log("name set");
            // Update successful.
        })
        .catch(function (error) {
            // An error happened.
        });
};
