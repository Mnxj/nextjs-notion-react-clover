import React from 'react';
import {getPage} from '../lib/notion';
import * as config from 'lib/config';
import {ExtendedRecordMap} from 'notion-types';
import {isEmpty, random} from 'lodash';
import Layout from '../components/Layout';
import Link from 'next/link';


export const getStaticProps = async () => {
  const recordMap = await getPage(config.articlesPageId) as ExtendedRecordMap;
  let result;
  for (let recordKey in recordMap['collection_query']) {
    let value = recordMap['collection_query'][recordKey];
    for (let queryKey in value[config.tagsPageId]) {
      if (queryKey.startsWith('board_columns')) {
        result = value[config.tagsPageId][queryKey];
      }
    }
  }

  const props = result['results'].filter(item => !isEmpty(item.value.value)).map(item => ({
    key: String(item.value.value),
    total: item.total
  }));
  return {
    props: {...props},
    revalidate: 60
  };
};
const Tags = (props) => {
  return (
    <Layout isNotionFooter={true}>
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
                  src='data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%271760%27%20height=%271201%27/%3e'
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
               srcSet='/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F7de19ce8-e25c-424a-9cf0-a2a9ca6faa28%252F004630-16460667904dd2.jpeg%3Ftable%3Dblock%26id%3D4ee34fae-1079-479d-846a-ed48fac40af0%26cache%3Dv2&amp;w=1920&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F7de19ce8-e25c-424a-9cf0-a2a9ca6faa28%252F004630-16460667904dd2.jpeg%3Ftable%3Dblock%26id%3D4ee34fae-1079-479d-846a-ed48fac40af0%26cache%3Dv2&amp;w=3840&amp;q=75 2x'
               src='/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F7de19ce8-e25c-424a-9cf0-a2a9ca6faa28%252F004630-16460667904dd2.jpeg%3Ftable%3Dblock%26id%3D4ee34fae-1079-479d-846a-ed48fac40af0%26cache%3Dv2&amp;w=3840&amp;q=75'
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
          <h1 className='notion-title'>Tags</h1>
          <div className='notion-collection-page-properties'>
            <div className='notion-collection-row'/>
          </div>
          <div className='tag-contents'>
            <div id='tags' className='container chip-container'>
              <div className='card'>
                <div className='card-content'>
                  <div className='tag-chips'>
                    {
                      Object.keys(props).map(index => {
                        return (
                          <Link href={`/tags/${props[index].key}`} key={props[index].key}>
                            <span className='chip' data-tagname={props[index].key}
                              style={{backgroundColor: 'rgb(' + [random(40, 255), random(40, 255), random(40, 255)].join(',') + ')'}}>{props[index].key}
                              <span className='tag-length'>{props[index].total}</span>
                            </span>
                          </Link>
                        );
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );

};
export default Tags;
