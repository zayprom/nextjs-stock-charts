import apiCall from "@/pages/api/apiCall"
import { useContext, useEffect, useState } from "react"
import styles from '../styles/StockList.module.css'
import { StockListContext } from "@/context/stockListProvider"

export const SearchBox = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const { addStock } = useContext(StockListContext)

    const clearSearch = () => {
        setSearch('')
    }

    const renderList = () => {
        return (
            <ul style={{ display: search ? 'block' : 'none' }} className={styles.dropdownList}>
                {results.map((result) => {
                    return (
                        <li key={result.symbol}
                            className={styles.dropdownItems}
                            onClick={() => {
                            addStock(result.symbol)
                            clearSearch()
                            }}>
                            {result.description} ({result.symbol})
                        </li>
                    )
                })}
            </ul>
        )
    }

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await apiCall.get('/search', {
                    params: {
                        q: search
                    }
                })

                // Set the filter to receive only 'Common Stock' from apiCall
                const filterByType = response.data.result.filter(filteredItem => filteredItem.type === 'Common Stock')

                if (isMounted) {
                    setResults(filterByType)
                    console.log(filterByType)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (search.length > 0) {
            fetchData()
        } else {
            setResults([]) // set it to empty arr
        }

        return () => (isMounted = false)
    }, [search])

    return (
        <div className={styles.seachBox}>
            <input className={styles.searchInput} type='text' placeholder='Search for index' value={search} onChange={(e) => {setSearch(e.target.value)}} />
            {/* <label htmlFor="search">Search</label> */}
            <button className={styles.clearButton} onClick={clearSearch}>Clear</button>
            {renderList()}
        </div>
    )
}

