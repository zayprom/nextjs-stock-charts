import apiCall from "../api/apiCall";
import { useState, useEffect } from "react";
import styles from '../../styles/StockList.module.css'
import { Header } from "./Header";
import { NewsBox } from "./NewsBox";

export const StockList = () => {
    const [stock, setStock] = useState([])
    const [stockList, setStockList] = useState(['MSFT', 'GOOGL', 'AAPL', 'AMZN', 'TSLA']);

    useEffect(() => {
        // Check when its mounted
        let isMounted = true
        const fetchData = async () => {
            try {
                // Fetch all data
                const responses = await Promise.all(stockList.map((stock) => {
                    return apiCall.get('/quote', {
                        params: {
                            symbol: stock
                        }
                    })
                }))
                // Filter to have only data from the reponse
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })
                if (isMounted) {
                    setStock(data)
                }
                console.log(data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        return () => (isMounted = false)
    }, [stockList])

    return (
        <>
            <Header headingText={'Market News'} />
            <div className={styles.stockListContainer}>
                <ul className={styles.stockListCards}>
                    {/* FIX: if there < 5 items, add empty box to add another item */}
                    {stock.map((stockData) => {
                        return (
                            <li className={styles.stockListCard} key={stockData.symbol}>
                                <h2>{stockData.symbol}</h2>
                                <p>{stockData.data.c} $</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
            
        </>
    )
}