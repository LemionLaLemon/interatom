import styles from "./styles/pages.module.css"
export default function Page() {
    return(
        <>
            <div className={styles.secondaryHeader}>
                <h1>Nuclear and Operational Safety</h1>
            </div>
            <div className={styles.content}>
                <p>Nuclear and operational safety is seen as a priority at InterATOM Power. Our safety measures are designed to protect both our employees and the surrounding communities and infrastructure. Our power generation facilities are designed to reduce nuclear risks and industrial hazards, in turn, protecting employees from potential accidents and ensuring the safe operation of our plants. We employ strict safety protocols during construction, operation, and dismantlement of our power generation facilities. We focus on accident-free operation of our generation facilities, and other potentially hazardous nuclear facilities. All design, construction, maintenance, and operational activities including those of subcontractors are licensed and supervised by the <a href="https://eru.gov.cz/en">Energy Regulatory Office</a>(ERO). Additionally, nuclear generation facilities and hazardous facilities are regularly inspected by InterATOM Power to ensure the highest level of safety.</p>
                <p>Our approach encompassing a comprehensive set of safety measures ensures sustainable nuclear performance and makes us a leader in use of safety regulations.</p>
                <img className={styles.full} src="/images/TokamakContainmentSystems.png"/>
                <p>InterATOM Power's nuclear and radiation safety policy is implemented by our R&D department and by the subsidiaries directly involved in the disposal and storage of spent nuclear fuel and radioactive waste.</p>
                <p>To further enhance our safety performance and protect our personnel, we implement rigorous training programs and human performance tools such as Stop Think Act Review and three-way communication to ensure proper communication between all plant employees, ensuring no mistakes can be made that may compromise our safety standards. Employees undergo regular training to enhance their skills and always stay alert.</p>
            </div>
        </>
    );
};