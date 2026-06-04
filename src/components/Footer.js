import { Link } from "react-router-dom";
import styles from "./styles/Footer.module.css"

export default function Footer() {
    return(
        <>
            <footer className={styles.footer}>
                <div className={styles.horizontal}>
                    <ul>
                        <li><Link to="/about-us">ABOUT US</Link></li>
                        <li><Link to="/sustainability">SUSTAINABILITY</Link></li>
                        <li><Link to="/safety">SAFETY</Link></li>
                        <li><Link to="/contacts">CONTACTS</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/news">NEWS</Link></li>
                        <li><Link to="/library">LIBRARY</Link></li>
                        <li><Link to="/cookies">COOKIE POLICY</Link></li>
                    </ul>
                </div>
                <hr/>
                <span className={styles.copy}>&copy; {new Date().getFullYear()} <Link to="/">InterATOM POWER</Link>. All rights reserved.</span>
            </footer>
        </>
    );
};