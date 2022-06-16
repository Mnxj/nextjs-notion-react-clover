import Layout from './Layout';
import React from 'react';

export const LayoutTemp = ({children, browseTotal, LayoutTitle, url}: any) => {

  return (
    <Layout browseTotal={browseTotal} isNotNotionFooter={true} title={LayoutTitle}>
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
          <span style={{
            boxSizing: 'border-box',
            display: 'block',
            width: 'initial',
            height: 'initial',
            background: 'none',
            opacity: 1,
            border: '0px',
            margin: '0px',
            padding: '0px',
            maxWidth: '100%'
          }}><img alt='' aria-hidden='true'
                  src='/images/orange.svg'
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    border: '0px',
                    margin: '0px',
                    padding: '0px'
                  }}/></span>
          <img alt='tags'
               srcSet={String(`${url}w=1980&q=75 1x, ${url}w=3840&q=75 2x`)}
               src={String(`${url}w=3840&q=75`)}
               decoding='async' data-nimg='intrinsic' className='notion-page-cover'
               style={{
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
                 minHeight: '100%',
                 maxHeight: '100%',
                 objectPosition: ' center 50%'
               }}/>
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
