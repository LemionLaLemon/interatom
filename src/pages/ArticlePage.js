import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import styles from "./styles/article.module.css"

export default function Page() {
    const { url } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const client = createClient({
            space: process.env.REACT_APP_CONTENTFUL_SPACE,
            environment: 'master',
            accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
        })

        client.getEntries({content_type: 'news', 'fields.url': url})
        .then((response) => {
            setArticle(response.items[0]);
            setLoading(false);
        })
        .catch(console.error);
    }, [url])

    if (!article) return (
        <span>An article with matching URL could not be found.</span>
    );
    if (loading) return (
        <span>Loading...</span>
    );

    return(
        <>
            <div className={styles.secondaryHeader}>
                <h1>{article.fields.header}</h1>
                <h3>{article.fields.subheader}</h3>
                <span className={styles.date}>{new Date(article.fields.created).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
            </div>
            <div className={styles.newspage}>
                <p className={styles.path}><Link to="/news/">News</Link> &gt; <Link to={"/news/" + url}>{article.fields.header}</Link></p>
                {documentToReactComponents(article.fields.newscontent, {
                    renderNode: {
                        'embedded-asset-block': (node) => (
                            <img src={node.data.target.fields.file.url} alt={node.data.target.fields.title}/>
                        )
                    }
                })}
            </div>
        </>
    );
};