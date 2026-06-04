import { Helmet } from "react-helmet-async";
import styles from "./styles/pages.module.css"
const embedImage = `${process.env.PUBLIC_URL}/images/Values.png`;
export default function Page() {
    return(
        <>
            <Helmet>
                <title>About Us - InterATOM Power</title>
                <meta property="og:image" content={embedImage}/>
                <meta name="twitter:image" content={embedImage}/>
            </Helmet>
            <div className={styles.secondaryHeader}>
                <h1>About Us</h1>
            </div>
            <div className={styles.content}>
                <p>InterATOM Power is a leading energy company dedicated to providing sustainable and innovative energy solutions. With a commitment to environmental responsibility and cutting-edge technology, we strive to power a brighter future for communities around the world.</p>
                <img className={styles.full} src="/images/SawtoothCR.png"/>
                <p>Our mission is to deliver reliable, clean, and affordable energy while minimizing our environmental impact. We invest in renewable energy sources, such as nuclear, and are actively exploring new technologies to enhance our energy production capabilities.</p>
                <p>At InterATOM Power, we believe in fostering strong relationships with our customers, employees, and stakeholders. We are committed to transparency, integrity, and social responsibility in all aspects of our business.</p>
                <img className={styles.full} src="/images/Values.png"/>
            </div>
        </>
    );
};