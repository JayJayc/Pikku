import Link from "next/link";
import styles from "./Header.module.css";
import { useState } from "react";

const linkStyle = {
    marginLeft: 15
};

const header = {
    top: 0,
    left: 0,
    height: 50,
    width: "100%",
    background: "#BDC3C7"
};

const MenuIcon = clickedObj => {
    let src;
    if (clickedObj.clicked) {
        src = "/images/x_close.png";
    } else {
        src = "/images/burger_menu.png";
    }
    return <img className={styles.menuIcon} src={src} alt="my image" />;
};

const NavMenu = open => {
    let classNames;
    if (open.clicked) {
        classNames = (styles.navMenu, styles.active);
    } else {
        classNames = styles.navMenu;
    }
    return (
        <div className={classNames}>
            <Link href="/">
                <a style={linkStyle}>Home</a>
            </Link>
            <Link href="/about">
                <a style={linkStyle}>About</a>
            </Link>
        </div>
    );
};
const Header = () => {
    const [menuClicked, setMenuClicked] = useState(false);
    return (
        <React.Fragment>
            <div style={header}>
                <div
                    className={styles.menuButton}
                    onClick={() => setMenuClicked(!menuClicked)}
                >
                    <MenuIcon clicked={menuClicked} />
                </div>
            </div>
            <NavMenu clicked={menuClicked} />
        </React.Fragment>
    );
};

export default Header;
