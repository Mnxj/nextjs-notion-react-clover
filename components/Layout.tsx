import * as React from 'react';

import styles from './styles.module.css';
import { Footer } from './Footer';
import { PageHeader } from './Header';
import { useEffect, useState } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import { PageHead } from './PageHead';
import { author, logo } from '../lib/config';
import { GitHubShareButton } from './GitHubShareButton';


import MouseClickAnimation from 'react-click-display-fireworks';

const Layout = ({children, isNotNotionFooter, title}: any) => {
  const [openNav, setOpenNav] = useState (false);
  useEffect(() => {
    
    const canvasEl = document.querySelector ('.fireworks') as any;
    if (canvasEl) {
      const mouse = new MouseClickAnimation(canvasEl);

      const onMousedown =
        (e ) => {
          mouse.updateCoords(e)
          mouse.animateParticules()
      }
      document.addEventListener('mousedown',onMousedown)
      mouse.setCanvasSize();
      window.addEventListener('resize', mouse.setCanvasSize);
      return () => {
        document.removeEventListener('mousedown',onMousedown);
        window.removeEventListener('resize', mouse.setCanvasSize);

      }
    }
  }, []);
  return (
    <>
      <canvas className='fireworks' style={{position: 'fixed', left: 0, top: 0, zIndex: 99999999, pointerEvents: 'none',}}/>
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
        {isNotNotionFooter && <Footer/>}
      </section>
      <Sidebar openNav={openNav}/>
      <GitHubShareButton/>
    </>
  );
};
export default Layout;
