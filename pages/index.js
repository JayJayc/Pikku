import withLayout from "../components/MainLayout";
import Link from "next/link";

const landingContainer = {
    width: "60%",
    minWidth: "350px",
    maxWidth: "600px",
    /* margin: 0 auto; */
    paddingTop: "20vh",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center"
};
const linkStyle = {
    marginRight: "15px"
};
const containerBackground = {
    margin: 0,
    paddingTop: 10,
    background: "#545454",
    opacity: 0.8
};
const background = {
    margin: 0,
    top: 0,
    left: 0,
    height: 850,
    backgroundImage: 'url("/images/food_background1.jpg")',
    backgroundPosition: "center",
    backgroundRepeat: "no - repeat",
    backgroundSize: "cover",
    opacity: 0.9
};

const Landing = props => {
    return (
        <React.Fragment>
            <div style={background}>
                <div style={landingContainer}>
                    <div style={containerBackground}>
                        <h1>Welcome to Pikku</h1>
                        <h3>Sed commodo elementum elit ac iaculis.</h3>
                        <button>
                            <Link href="/create">
                                <a style={linkStyle}>Create Room</a>
                            </Link>
                        </button>
                        <button>
                            <Link href="/join">
                                <a style={linkStyle}>Join Room</a>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default withLayout(Landing);
