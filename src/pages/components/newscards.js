import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "contentful";
import styles from "../styles/newscards.module.css";

import NewsCard from "./newscard";

export default function NewsCards() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const client = createClient({
            space: process.env.REACT_APP_CONTENTFUL_SPACE,
            environment: 'master',
            accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
        })
        
        client.getEntries({content_type: 'news', limit: 4, select: 'fields.header, fields.created, fields.url', order: '-sys.createdAt'})
        .then((response) => {
            setArticles(response.items);
        })
        .catch(console.error)
    }, [])

    return (
        <div className={styles.cards}>
            {articles.map((item) => (
                <NewsCard
                    key={item.fields.url}
                    header={item.fields.header}
                    datepublished={item.fields.created}
                    to={item.fields.url}
                >
                </NewsCard>
            ))}
        </div>
    )
}