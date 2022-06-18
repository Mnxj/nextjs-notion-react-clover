import * as React from 'react';

import styles from './styles.module.css';
import {Footer} from './Footer';
import {PageHeader} from './Header';
import {useState} from 'react';
import {Sidebar} from './sidebar/Sidebar';
import {PageHead} from './PageHead';
import {author, logo} from '../lib/config';

const Layout = ({children, browseTotal, isNotNotionFooter, title}: any) => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      {isNotNotionFooter && <PageHead title={title}/>}
      <section
        id='main-container'
        className={openNav ? styles.mainContainer : ''}
      >
        <div className={openNav ? styles.openNav : styles.openInvalidNav}>
          <div className={styles.iconFlat} onClick={() => setOpenNav(!openNav)}>
            <span className={styles.icon}/>
          </div>
          <div className={styles.headerBranding}>
            <h1 className={styles.headerTitle}>
              {author}
              <img src={logo} className={styles.imageLog} alt='log'/>
            </h1>
          </div>
        </div>
        <PageHeader block={null}/>
        {children}
        {isNotNotionFooter && <Footer browse={browseTotal}/>}
      </section>
      <Sidebar openNav={openNav}/>
    </>
  );
};
export default Layout;
