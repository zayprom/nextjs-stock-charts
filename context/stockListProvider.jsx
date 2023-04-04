import { createContext, useState } from "react";

export const StockListContext = createContext()

export const StockListContextProvider = (props) => {
    const [stockList, setStockList] = useState(['MSFT', 'GOOGL', 'AAPL', 'AMZN', 'TSLA'])
    const [watchList, setWatchList] = useState(['MSFT', 'AAPL', 'TSLA'])

    const addStock = (stock) => {
        if (watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock])
        }
    }

    return(
        <StockListContext.Provider value={{stockList, watchList, addStock}}>
            {props.children}
        </StockListContext.Provider>
    )

}