import styles from '../styles/Home.module.css'

export const Header = ({ headingText }) => {
    return (
        <div className={styles.headingArea}>
            <h1>{headingText}</h1>
        </div>
    )
}