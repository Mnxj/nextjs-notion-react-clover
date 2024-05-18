import Layout from './Layout';
import React from 'react';
import ProgressiveImg from './ProgressiveImg';
import {useRouter} from 'next/router';
import {Loading} from './Loading';

export const LayoutTemp = ({children, LayoutTitle, url}: any) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading />
  }
  return (
    <Layout isNotNotionFooter={true} title={LayoutTitle}>
      <div className='notion-page-scroller'>
        <div className='notion-page-cover-wrapper'>
        <span style={{
          boxSizing: 'border-box',
          display: 'inline-block',
          overflow: 'hidden',
          width: 'initial',
          height: 'initial',
          background: 'none',
          opacity: 1,
          border: '0px',
          margin: '0px',
          padding: '0px',
          position: 'relative',
          maxWidth: '100%'
        }}>
          <ProgressiveImg src={String(`${url}w=3840&q=75`)} style={{
            position: 'absolute',
            inset: '0px',
            boxSizing: 'border-box',
            padding: '0px',
            border: 'none',
            margin: 'auto',
            display: 'block',
            width: '0px',
            height: '0px',
            minWidth: '100%',
            maxWidth: '100%',
            objectFit: 'cover',
            minHeight: '100%',
            maxHeight: '100%',
            objectPosition: ' center 50%'
          }} alt={LayoutTitle} />
        </span>
        </div>
        <main
          className='notion-page notion-page-has-cover notion-page-has-icon notion-page-has-text-icon notion-full-page'>
          <h1 className='notion-title'>{LayoutTitle}</h1>
          <div className='notion-collection-page-properties'>
            <div className='notion-collection-row'/>
          </div>
          {children}
        </main>
      </div>
    </Layout>
  );
};
