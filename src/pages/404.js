import { Helmet } from "react-helmet-async";

import styles from "./styles/404.module.css";

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
                <h1 className={styles.doesNotExist}>This page does not exist.</h1>
            </div>
        </>
    );
};