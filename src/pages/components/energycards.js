import { useEffect, useState } from "react";
import styles from "../styles/energycards.module.css";

export default function NewsCards() {
    const SAWTOOTH_MWh = 862052;
    const [vogatayaMWh, setVogatayaMWh] = useState(0);
    const [totalMWh, setTotalMWh] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/game?type=eq.TotalPowerMWh&select=value`, {
                    method: "GET",
                    headers: {
                        apikey: process.env.REACT_APP_SUPABASE_KEY,
                        Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
                        "Content-Type": "application/json"
                    }
                });
                console.log(response)
                if (!response.ok){
                    throw new Error(`GET failed with status ${response.status}`);
                }

                const data = await response.json();
                if (Array.isArray(data) && data.length > 0 && data[0]?.value != null){
                    const value = Number(data[0].value);
                    if (!Number.isNaN(value)){
                        setVogatayaMWh(value);
                        setTotalMWh(value + SAWTOOTH_MWh)
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className={styles.cards}>
            <div className={styles.TotalEnergyProduced}>
                <span className={styles.header1}>TOTAL ENERGY PRODUCED</span><br/>
                <span className={styles.header2}>{totalMWh.toLocaleString()} MWh</span>
            </div>
            <div className={styles.Vogataya}>
                <span className={styles.header1}>VOGATAYA GENERATING STATION</span><br/>
                <span className={styles.header2}>{vogatayaMWh.toLocaleString()} MWh</span>
            </div>
            <div className={styles.Sawtooth}>
                <span className={styles.header1}>SAWTOOTH ENERGY CENTER</span><br/>
                <span className={styles.header2}>{SAWTOOTH_MWh.toLocaleString()} MWh</span>
            </div>
        </div>
    )
}