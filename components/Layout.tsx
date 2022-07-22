import * as React from 'react';

import styles from './styles.module.css';
import { Footer } from './Footer';
import { PageHeader } from './Header';
import { useEffect, useState } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import { PageHead } from './PageHead';
import { author, logo } from '../lib/config';
import { GitHubShareButton } from './GitHubShareButton';
import anime from 'animejs';
import { debounce } from 'lodash';
import { animateParticules, updateCoords } from '../lib/mouse-click-animation';

const Layout = ({children, browseTotal, isNotNotionFooter, title}: any) => {
  const [openNav, setOpenNav] = useState (false);

  useEffect(() => {
    const canvasEl = document.querySelector ('.fireworks') as any;
    if (canvasEl) {
      const ctx = canvasEl.getContext ('2d'),
            setCanvasSize = debounce ( () => {
              canvasEl.width = 2 * window.innerWidth
              canvasEl.height = 2 * window.innerHeight
              canvasEl.style.width = window.innerWidth + 'px'
              canvasEl.style.height = window.innerHeight + 'px'
              canvasEl.getContext ('2d').scale (2, 2)
          }, 500);
      anime({
        duration: 1 / 0,
        update: () => ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
      });
      document.addEventListener('mousedown', (e ) => {
            updateCoords(e, canvasEl)
            animateParticules(ctx)
      }, !1)
            setCanvasSize()
            window.addEventListener('resize', setCanvasSize, !1);
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
        {isNotNotionFooter && <Footer browse={browseTotal}/>}
      </section>
      <Sidebar openNav={openNav}/>
      <GitHubShareButton/>
    </>
  );
};
export default Layout;
