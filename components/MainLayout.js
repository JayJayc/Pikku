import Header from "./Header";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../lib/apollo";
import styles from "./../styling/Main.module.css";

const layoutStyle = {};

// background-color: #e5dad6;

const withLayout = (Page) => {
    return () => (
        <div style={layoutStyle}>
            <style jsx global>{`
                body {
                    margin: 0;
                    font-family: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif";
                }
            `}</style>
            <ApolloProvider client={client}>
                <Header />
                <Page />
            </ApolloProvider>
        </div>
    );
};

export default withLayout;
