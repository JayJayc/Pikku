import Header from "./Header";

const layoutStyle = {};

// background-color: #e5dad6;

const withLayout = Page => {
    return () => (
        <div style={layoutStyle}>
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

export default withLayout;
