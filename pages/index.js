import Head from 'next/head'
import { Inter } from 'next/font/google'
import { NewsBox } from '../components/NewsBox'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>React Trading Charts</title>
        <meta name="description" content="React Trading Charts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header headingText={'Market News'} />
      <NewsBox />
    </>
  )
}
