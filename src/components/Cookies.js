import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./styles/Cookies.module.css"

export default function Cookies() {
    const COOKIE_CONSENT_NAME = 'interatom_cookie_consent';
    const COOKIE_CONSENT_VALUE = 'accepted';
    const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        const hasCookie = document.cookie.includes('interatom_cookie_consent=accepted');

        if (hasCookie) {
            setShowBanner(false);
        }
    }, []);

    function handleAccept(){
        document.cookie = 'interatom_cookie_consent=accepted; Max-Age=31536000; Path=/; SameSite=Lax';
        setShowBanner(false);
    }

    if (!showBanner){
        return null;
    }
    
    return(
        <>
            <div className={styles.cookies}>
                <span>This site uses cookies. By continuing your navigation, you accept the use of cookies. For more information, read our Cookies Policy. <Link to="/cookies/">Learn more</Link></span>
                <button onClick={handleAccept} className={styles.accept}>I accept the cookies</button>
            </div>
        </>
    );
};