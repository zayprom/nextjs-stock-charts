import Head from "next/head";
import { Watchlist } from "../../components/WatchList";
import { StockListContextProvider } from "@/context/stockListProvider";
import { Header } from "@/components/Header";

export default function WatchList () {
    return(
        <>
           <Head>
                <title>React Trading Charts - Watchlist</title>
                <meta name="description" content="React Trading Charts - Watchlist" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <StockListContextProvider>
            <Header headingText={'Watchlist - Stocks'} />
                <Watchlist />
            </StockListContextProvider>
        </>
    )
}