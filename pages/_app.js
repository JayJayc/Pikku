// import App from 'next/app'
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../lib/apollo";

const App = ({ Component, pageProps }) => {
    return (
        // <ApolloProvider client={client}>
        <Component {...pageProps} />
        /* </ApolloProvider> */
    );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
