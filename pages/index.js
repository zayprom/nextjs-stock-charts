import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { StockList } from '../components/StockList'
import { SideBar } from '../components/SideBar'
import { NewsBox } from '../components/NewsBox'
import { StockListContextProvider } from '@/context/stockListProvider'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Check Stock Price</title>
        <meta name="description" content="React Trading Charts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      
      <main className={styles.main}>
        <StockListContextProvider>
        <StockList />
        <NewsBox />
        <SideBar />
        </StockListContextProvider>
      </main>
    </>
  )
}
