import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createClient } from "contentful";
import NewsItem from "./components/newsitem"
import styles from "./styles/news.module.css"

export default function Page() {
    const [newsItems, setNewsItems] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const client = createClient({
            space: process.env.REACT_APP_CONTENTFUL_SPACE,
            environment: 'master',
            accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
        })

        client.getEntries({content_type: 'news', skip: page*20, limit: 20, select: 'fields.header, fields.subheader, fields.created, fields.url', order: '-sys.createdAt'})
        .then((response) => {
            setLoading(false);
            setNewsItems(response.items);
            setHasMore(response.items.length === 20);
        })
        .catch(console.error)
    }, [page])

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            if (hasMore) {
                setPage(prev => prev + 1);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore])

    if (loading) return (
        <span>Loading...</span>
    );

    return(
        <>
            <div className={styles.secondaryHeader}>
                <h1>News</h1>
            </div>
            <div className={styles.news}>
                <div className={styles.newsList}>
                    {newsItems.map((item) => (
                        <NewsItem
                        key={item.fields.url}
                        header={item.fields.header}
                        subheader={item.fields.subheader}
                        datepublished={new Date(item.fields.created).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}
                        to={item.fields.url}>
                        </NewsItem>
                    ))}
                </div>
            </div>
        </>
    );
};