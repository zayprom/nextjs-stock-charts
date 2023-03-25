import Head from "next/head";
import styles from '../../styles/Home.module.css'
import { SideBar } from "../../components/SideBar";
import { StockList } from "../../components/StockList";
import { Watchlist } from "../../components/WatchList";

export default function WatchList () {
    return(
        <>
           <Head>
                <title>Watchlist</title>
                <meta name="description" content="React Trading Charts - Watchlist" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <main className={styles.main}>
                <StockList />
                <Watchlist />
                <SideBar />
            </main>
        </>
    )
}