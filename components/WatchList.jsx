import apiCall from '@/pages/api/apiCall'
import { useContext, useEffect, useState } from 'react'
import styles from '../styles/StockList.module.css'
import { SearchBox } from './SearchBox'
import { StockListContext } from '@/context/stockListProvider'

export const Watchlist = () => {
    const [stock, setStock] = useState([])
    const { watchList } = useContext(StockListContext)

    useEffect(() => {
        let isMounted = true
        const fetchData = async() => {
            try {
                const responses = await Promise.all(watchList.map((list) => {
                    return apiCall.get('/quote', {
                        params: {
                            symbol: list
                        }
                    })
                }))
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
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
        return () => (isMounted = false)
    }, [watchList])

    const formatNumber = (num) => {
        return(num.toFixed(2))
    }

    const checkStockStatus = (change) => {
        return change > 0 ? 'up' : 'down';
    }

    const changeBorderColor = (stockStatus) => {
        return stockStatus > 0 ? 'border-up' : 'border-down'
    }
    
    return (
        <>
            <div className={styles.newsBox}>
                <div className={styles.flexBox}>
                    <h2>Watchlist</h2>
                    <SearchBox />
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Current</th>
                            <th>Change</th>
                            <th>Change%</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>POpen</th>
                            <th>PClose</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stock.map((stockItem) => {
                            return(
                                <tr key={stockItem.symbol}>
                                    <th>
                                        <span className={styles.stockSymbol + ' ' + changeBorderColor(stockItem.data.d)}>{stockItem.symbol}</span>
                                    </th>
                                    <td className={checkStockStatus(stockItem.data.d)}>{stockItem.data.c}</td>
                                    <td className={checkStockStatus(stockItem.data.d)}>{formatNumber(stockItem.data.d)}</td>
                                    <td className={checkStockStatus(stockItem.data.d)}>{formatNumber(stockItem.data.dp)}</td>
                                    <td>{formatNumber(stockItem.data.h)}</td>
                                    <td>{formatNumber(stockItem.data.l)}</td>
                                    <td>{formatNumber(stockItem.data.o)}</td>
                                    <td>{stockItem.data.pc}</td>
                                    <td><button onClick={() => console.log('favourite')}>Favourite</button></td>
                                </tr>
                            )
                            
                        })}
                        {/* {console.log(stock)} */}
                    </tbody>
                </table>
            </div>
        </>
    )
} 