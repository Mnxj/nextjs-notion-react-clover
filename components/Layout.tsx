import * as React from 'react'
import { Sidebar } from './sidebar/Sidebar'
import { useState } from 'react'

import styles from './styles.module.css'
import * as config from "../lib/config";
import {Footer} from './Footer';
import {PageHeader} from './Header';

const Layout = ({ children,browseTotal }: any) => {
  const [openNav, setOpenNav] = useState(false)
  return (
    <div>
      <section
        id='main-container'
        className={openNav ? styles.mainContainer : ''}
      >
        <div className={openNav ? styles.openNav : styles.openInvalidNav}>
          <div className={styles.iconFlat} onClick={() => setOpenNav(!openNav)}>
            <span className={styles.icon} />
          </div>
          <div className={styles.headerBranding}>
            <h1 className={styles.headerTitle}>
              {config.author}
              <img src={config.logo} className={styles.imageLog} alt='log' />
            </h1>
          </div>
        </div>
        <PageHeader block={null}/>
        {children}
        <Footer browse={browseTotal}/>
      </section>
      <Sidebar openNav={openNav} />
    </div>
  )
}
export default Layout
