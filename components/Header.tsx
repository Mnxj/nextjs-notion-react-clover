import styles from './styles.module.css'
import * as React from 'react'
import {useEffect, useState} from 'react'
import * as types from '../lib/types'
import {Breadcrumbs, useNotionContext} from 'react-notion-x'
import * as config from '../lib/config'
import {Links, navigationLinks} from "../lib/config";
import cs from 'classnames'
import Link from "next/link";
import {NotionSearch} from "./NotionSearch";
import {isEmpty} from 'lodash';

export const RollList = ({status}:{status:boolean}) => {
  const {components, mapPageUrl} = useNotionContext()
  return (
    <ul>
      {navigationLinks
        ?.map((link, index) => {
          if (link.is_mobile&&link.is_mobile !==status){
            return null
          }
          if (!link.pageId && !link.url) {
            return null
          }
          if (link.pageId) {
            return (
              <components.PageLink
                href={mapPageUrl(link.pageId)}
                key={index}
                className={cs(styles.navLink, 'breadcrumb', 'button')}
              >
                <li>
                  <span className={link.span_class}>
                    <i className={link.i_class}/>
                    &nbsp;{link.title}
                  </span>
                </li>
              </components.PageLink>
            )
          } else {
            return (
              <components.Link
                href={link.url}
                key={index}
                className={cs(styles.navLink, 'breadcrumb', 'button')}
                target=''
              >
                <li>
                  <span className={link.span_class}>
                    <i className={link.i_class}/>
                    &nbsp;{link.title}
                  </span>
                </li>
              </components.Link>
            )
          }
        })
        .filter(Boolean)}
    </ul>
  )
}

export const PageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({block}) => {
  const [scrollStyles, setScrollStyles] = useState(false)
  const [scrollTopWidth, setScrollTopWidth] = useState(0)
  const [scrollTopWidthFlag, setScrollTopWidthFlag] = useState(false)
  const [searchFlag, setSearchFlag] = useState(false)
  const handleScroll = () => {
    setScrollTopWidthFlag(true)
    if (document.documentElement.scrollTop > 60) {
      setScrollStyles(true)
    } else {
      setScrollStyles(false)
    }

    // scrollHeight=clientHeight+scrollTop
    setScrollTopWidth(
      (document.documentElement.scrollTop * 100) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)
    )
  }

  const backTop = () => {
    setScrollStyles(false)
    const anchorElement = document.getElementById('main-container') // 须要定位看到的锚点元素
    if (anchorElement) {
      anchorElement.scrollIntoView({behavior: 'smooth'})
    }
  }
  useEffect(() => {
    if (scrollTopWidth >= 98) {
      setTimeout(() => {
        setScrollTopWidthFlag(false)
      }, 2000)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollStyles, scrollTopWidth])
  return (
    <div id='main-header' className={styles.mainHeader}>
      <div
        className={scrollTopWidthFlag ? styles.scrollTop : ''}
        style={{width: `${scrollTopWidth}%`}}
      />
      <a
        className={scrollStyles ? styles.cdTopVisible : styles.cdTop}
        onClick={backTop}
      />
      <header
        className={
          scrollStyles ? styles.headerWhiteContainer : styles.headerContainer
        }
      >
        <div className={styles.headerTop}>
          <div className={styles.headerBranding}>
            <div className={styles.headerTitle}>
              <img
                src={config.logo}
                className={styles.imageLog}
                alt='log'
              />

              {isEmpty(block)||Links.has(block.id.replaceAll("-", "")) ? <div className="breadcrumbs">
                  <Link href="/"><a className="breadcrumb">
                    <span className="title">{config.author}</span></a>
                  </Link>
                </div>
                : <Breadcrumbs block={block} rootOnly={false}/>}
            </div>
          </div>

          <div className={styles.searchBox} onClick={()=>setSearchFlag(true)}>
            <i className='iconfont icon-search'/>
          </div>
          <div className={styles.lowerContainer}>
            <div className={styles.lower}>
              <nav>
                <RollList status={false}/>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <button className={styles.mCdTop} title='Go to top' onClick={backTop}>
        <i className='iconfont icon-top1' aria-hidden='true'/>
      </button>
      <div className={searchFlag ? 'search-form search-form--modal is-visible' : 'search-form search-form--modal'}>
          <NotionSearch />
          <div className='search_close' onClick={() => setSearchFlag(false)}/>
      </div>
    </div>
  )
}
