import Head from "next/head"
import { Header } from "@/components/Header"
import { StockListContextProvider } from "@/context/stockListProvider"
import { CategoriesList } from "@/components/CategoriesList"

export default function Categories () {
    return(
        <>
        <Head>
                <title>React Trading Charts - Categories</title>
                <meta name="description" content="React Trading Charts - Categories" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <StockListContextProvider>
                <Header headingText={'Categories'} />
                <CategoriesList />
            </StockListContextProvider>
        </>
    )
}