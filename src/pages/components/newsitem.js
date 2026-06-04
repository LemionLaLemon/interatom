import { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/news.module.css"

export default function NewsItem({ datepublished, header, subheader, to }){
    return(
        <Link className={styles.newsListItem} to={"/news/" + to}>
            <span className={styles.newsListDate}>{datepublished}</span>
            <h2>{header}</h2>
            <p>{subheader}</p>
        </Link>
    );
}