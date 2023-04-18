import apiCall from "../pages/api/apiCall";
import { useState, useEffect } from "react";
import styles from '../styles/StockList.module.css'

export const NewsBox = () => {
    const [news, setNews] = useState([])
    const [newsList, setNewsList] = useState(['general'])

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const responses = await Promise.all(newsList.map((news) => {
                    return apiCall.get('/news', {
                        params: {
                            category: news
                        }
                    })
                }))
                const data = responses.map((response) => {
                    return {
                        data: response.data.slice(0, 10),
                    }
                })
                if (isMounted) {
                    setNews(data)
                }
                // console.log(data[0])
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        return () => (isMounted = false)
    }, [newsList])

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000)
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString()}`;
        return formattedDate
    }
    

    return(
        <div className={styles.newsBox}>
        <h2>Newsroom</h2>
            <ul className={styles.newsList}>
                {news.map((item) => {
                    return item.data.map((singleNews) => {
                        return (
                            <li key={singleNews.id} className={styles.newsListItem}>
                                <img className={styles.newsListItemImg} src={singleNews.image} />
                                <div className={styles.newsListItemInfo}>
                                    <a href={singleNews.url}>{singleNews.headline.replace(/^:\s*/, '')}</a>
                                    <p className={styles.source}>{singleNews.source} | {formatDate(singleNews.datetime)}</p>
                                </div>
                            </li>
                        );
                    });
                })}
            </ul>
        </div>
    )
}