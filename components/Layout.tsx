import styles from '../styles/Layout.module.css'
import type { AppProps } from 'next/app'


const Layout = ({ children }: any) => {
  return (
    <div className={styles.container}>
        <main className={styles.Main}>
            {children}
        </main>
    </div>
  )
}

export default Layout