import Header from "./Header";

import styles from "./../styling/Main.module.css";

// background-color: #e5dad6;

const WithLayout = (Page) => {
    console.log(typeof Page);
    return () => (
        <div>
            <style jsx global>{`
                body {
                    margin: 0;
                    font-family: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif";
                }
            `}</style>
            <Header />
            <Page />
        </div>
    );
};

export default WithLayout;
