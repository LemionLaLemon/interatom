import { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/newscard.module.css"

export default function NewsCard({ datepublished, header, to }) {
    return(
        <Link to={"/news/"+to} className={styles.card}>
                <div className={styles.date}>
                    <span>{new Date(datepublished).getDate().toString().padStart(2, "0")}</span>
                    <span>{new Date(datepublished).toLocaleString('en-US', { month: 'long' })}<br/>{new Date(datepublished).getFullYear()}</span>
                </div>
                <div className={styles.content}>
                    <span className={styles.header}>{header}</span>
                    <span className={styles.more}>More</span>
                </div>
        </Link>
    );
}