import { SideBar } from "./SideBar";
import styles from '../styles/Home.module.css'
import { StockList } from "./StockList";
import { StockListContextProvider } from "@/context/stockListProvider";
import { Header } from "./Header";

export default function Layout({children}) {
    return (
        <>
        <main className={styles.main}>
            <StockListContextProvider>
                <StockList />
                <SideBar />
                {children}
            </StockListContextProvider>
        </main>
        </>
    )
}