import * as React from 'react';

import styles from './styles.module.css'
import * as config from "../lib/config";
import {Footer} from './Footer';
import {PageHeader} from './Header';
import {useState} from 'react';
import {Sidebar} from './sidebar/Sidebar';

const Layout = ({children, browseTotal, isNotNotionFooter}: any) => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
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
        {isNotNotionFooter && <Footer browse={browseTotal}/>}
      </section>
      <Sidebar openNav={openNav} />
    </>
  );
};
export default Layout;
