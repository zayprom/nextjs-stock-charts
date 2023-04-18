import apiCall from "../pages/api/apiCall";
import { useState, useEffect, useContext, useMemo } from "react";
import styles from '../styles/StockList.module.css'
import { StockListContext } from "@/context/stockListProvider";

export const StockList = () => {
    const [stock, setStock] = useState([])
    const { stockList } = useContext(StockListContext)

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
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        return () => (isMounted = false)
    }, [stockList])

    const formatNumber = (num) => {
        return (num.toFixed(2))
    }

    const checkStockStatus = (change) => {
        return change > 0 ? 'up' : 'down';
    }

    const memoizedStockList = useMemo(() => {
        return stock.map((stockData) => {
                return (
                    <li className={styles.stockListCard} key={stockData.symbol}>
                        <h2>{stockData.symbol}</h2>
                        <p className={checkStockStatus(stockData.data.d)}>{formatNumber(stockData.data.c)} $</p>
                    </li>
                )
            })
    }, [stock])

    return (
        <>
            <div className={styles.stockListContainer}>
                <ul className={styles.stockListCards}>
                    {/* FIX: if there < 5 items, add empty box to add another item */}
                    {memoizedStockList}
                </ul>
            </div>
            
        </>
    )
}