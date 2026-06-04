import styles from "./styles/pages.module.css"
export default function Page() {
    return(
        <>
            <div className={styles.secondaryHeader}>
                <h1>Sustainability</h1>
            </div>
            <div className={styles.content}>
                <p>At InterATOM, we are committed to sustainable practices and environmental responsibility.</p>
                <p>We prioritize the use of clean energy sources and invest in innovative technologies to reduce our carbon footprint. Our goal is to create a sustainable future for generations to come.</p>
                <p>We actively engage with our communities and stakeholders to promote sustainability initiatives and support environmental conservation efforts. Through our dedication to sustainability, we aim to make a positive impact on the planet while delivering reliable energy solutions.</p>
                <p>Since December 2025, InterATOM has been closely following the United Nations Global Compact. Company influences the achievement of the <a href="https://www.un.org/sustainabledevelopment/">UN Sustainable Development Goals (UN SDGs)</a> through sales of its products and financial and economic results of the activity, as well as by ensuring ESG principles in all internal operations.</p>
                <p> InterATOM's activities make a solid contribution to all 17 UN SDGs. Due to the scale of business and individual NPP construction projects, the key goals for InterATOM are:</p>
                <img className={styles.third} src="/images/SDG1.png"/>
                <p>ESG quality level of InterATOM is confirmed by ESG ratings on a regular basis. In particular, in January 2026, InterATOM received a high ESG rating of ESG-2 (ESG-B), reflecting our commitment to sustainable practices and responsible corporate governance.</p>
                <br/>
                <br/>
                <img className={styles.third} src="/images/carbon.jpg"/>
                <p>Nuclear power is one of the low-carbon energy sources that contribute to reducing greenhouse gas emissions and combating climate change. In accordance with the current international and national standards, InterATOM is committed to maintaining the highest safety and environmental protection measures in all its nuclear power operations. During calculations, 7 stages of the NPP life cycle were identified, and the most carbon-intensive are the NPP construction and Decommissioning stages.</p>
            </div>
        </>
    );
};