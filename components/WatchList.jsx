import apiCall from '@/pages/api/apiCall'
import { useContext, useEffect, useState } from 'react'
import styles from '../styles/StockList.module.css'
import { SearchBox } from './SearchBox'
import { StockListContext } from '@/context/stockListProvider'

export const Watchlist = () => {
    let nextId = 3
    const categoriesList = [
        {
            id: 1,
            item: 'All',
        },
        {
            id: 2,
            item: 'Tech'
        }
    ]

    const [stock, setStock] = useState([])
    const [categories, setCategories] = useState(categoriesList)
    const [newCategory, setNewCategory] = useState('')
    const { watchList } = useContext(StockListContext)
    const [showInput, setShowInput] = useState(false)

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
    
    const handleAddNewCategory = (item) => {
        setCategories([...categories, {
            id: nextId++,
            item: item
        }])
    }

    const toggleInput = () => setShowInput(!showInput)
    
    return (
        <>
            <div className={styles.newsBox}>
                <div className={styles.flexBox}>
                    <h2>Watchlist</h2>
                    <SearchBox />
                </div>
                <ul className={styles.filtersList}>
                    {categories.map((filter) => {
                        return (
                            <li key={filter.id} className={styles.filtersItem}>{filter.item}</li>
                        )
                    })}
                    {showInput ? (
                        <>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                handleAddNewCategory(newCategory)
                                setNewCategory('')
                            }} className={styles.filterForm}>
                                <input 
                                    type='text' 
                                    placeholder='Type category'
                                    value={newCategory}
                                    className={styles.newFiltersInput}
                                    onChange={e => setNewCategory(e.target.value)}
                                />
                                <button className={styles.newFiltersInput} type='submit'>Add</button>
                            </form>
                            <button className={styles.cancelButton} onClick={toggleInput}>Cancel</button>
                        </>
                        )
                        :
                        (
                        <>
                            <button className={styles.newFiltersInput} onClick={toggleInput}>Add new</button>
                        </>
                        )
                    }
                </ul>
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
                                    <td className={checkStockStatus(stockItem.data.d)}>{formatNumber(stockItem.data.c)}</td>
                                    <td className={checkStockStatus(stockItem.data.d)}>{formatNumber(stockItem.data.d)}</td>
                                    <td className={checkStockStatus(stockItem.data.d)}>{formatNumber(stockItem.data.dp)}</td>
                                    <td>{formatNumber(stockItem.data.h)}</td>
                                    <td>{formatNumber(stockItem.data.l)}</td>
                                    <td>{formatNumber(stockItem.data.o)}</td>
                                    <td>{formatNumber(stockItem.data.pc)}</td>
                                    {/* <td><button>Favourite</button></td> */}
                                    <td>
                                        <select className={styles.formSelectCategory}>
                                            {categories.map((option) => {
                                                return (
                                                    <option key={option.id} value={option.item}>{option.item}</option>
                                                )
                                            })}
                                        </select>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
} 