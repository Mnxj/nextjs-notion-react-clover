import React from 'react';
import Layout from '../components/Layout';
import {db} from '../lib/db';

export const getStaticProps = async () => {
  const props = await db.get('created-time')
  return {
    props:{...props},
    revalidate: 60
  };
};
const Created = (props) => {
  console.log(props)
  return (
    <Layout isNotNotionFooter={true}>
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

      </div>
    </Layout>
  );

};
export default Created;
