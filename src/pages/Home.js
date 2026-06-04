import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import styles from "./styles/Home.module.css";
import NewsCards from "./components/newscards";
import EnergyCards from "./components/energycards"

const pageDescription = "InterATOM Power is among the most important producers and distributors in the field of electricity.";
const embedImage = `${process.env.PUBLIC_URL}/images/banner.png`;

export default function Home() {
    return(
        <>
            <Helmet>
                <title>InterATOM Power</title>
                <meta property="og:description" content={pageDescription} />
                <meta name="twitter:description" content={pageDescription} />
                <meta property="og:image" content={embedImage}/>
                <meta name="twitter:image" content={embedImage}/>
            </Helmet>
            <div className="root">
                <img src="/images/banner.png" className={styles.banner}></img>
                <NewsCards className={styles.cards}></NewsCards>
                <EnergyCards></EnergyCards>
                <div className={styles.safety}>
                    <Link to="/safety/">
                        <img src="/images/Safety.png" className={styles.safetyImage}/>
                    </Link>
                </div>
            </div>
        </>
    );
};