import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/NavBar.module.css"

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const hamburger = useRef(null);

    return(
        <>
            <nav className={styles.navbar}>  
                <Link to="/" className={styles.home}>
                    <img src="/images/InterATOM.png" alt="InterATOM logo"/>
                    <span>InterATOM</span>
                </Link>
                <Link className={styles.navitem} to="/about-us/">ABOUT US</Link>
                <Link className={styles.navitem} to="/sustainability/">SUSTAINABILITY</Link>
                <Link className={styles.navitem} to="/safety">SAFETY</Link>
                <Link className={styles.navitem} to="/news/">NEWS</Link>
                <Link className={styles.navitem} to="/library/">LIBRARY</Link>
                <button ref={hamburger} className={styles.hamburger} aria-label="Menu" aria-expanded={open ? "true" : "false"} aria-controls="mobile-menu-panel" onClick={() => setOpen(prev => !prev)}>
                    <img src="/vectors/menu.svg"></img>
                </button>
            </nav>
            <div className={`${styles.mobilemenupanel} ${open ? styles.isOpen : ""}`} aria-hidden={open ? "false" : "true"}>
                <ul>
                    <li><Link onClick={() => setOpen(false)} to="/about-us/">ABOUT US</Link></li>
                    <li><Link onClick={() => setOpen(false)} to="/sustainability/">SUSTAINABILITY</Link></li>
                    <li><Link onClick={() => setOpen(false)} to="/safety/">SAFETY</Link></li>
                    <li><Link onClick={() => setOpen(false)} to="/news/">NEWS</Link></li>
                    <li><Link onClick={() => setOpen(false)} to="/library/">LIBRARY</Link></li>
                </ul>
            </div>
        </>
    );
};