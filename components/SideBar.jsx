import styles from '../styles/SideBar.module.css'
import Link from 'next/link'


export const SideBar = () => {
    return(
        <>
            <div className={styles.logoArea}>Logo</div>
            <div className={styles.sideBar}>
                <nav className={styles.sideNav}>
                    <ul className={styles.navList}>
                        <Link className={styles.navLink} href="/"><li>Market news</li></Link>
                        <Link className={styles.navLink} href="/watchlist"><li>Watchlist</li></Link>
                        <Link className={styles.navLink} href="/categories"><li>Categories</li></Link>
                        <li className={styles.navLink}>Top sellers</li>
                        <li className={styles.navLink}>Top losers</li>
                    </ul>
                </nav>
            </div>
        </>
    )
}