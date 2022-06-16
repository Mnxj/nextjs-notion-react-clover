import React, {useState} from 'react';
import {db} from '../lib/db';
import {isRedisEnabled} from '../lib/config';
import {isEmpty} from 'lodash';
import {getNotionIds} from '../lib/get-created-notions';
import {LayoutTemp} from '../components/LayoutTemp';
import {getBrowseTotal} from '../lib/hander-redis';
import {useNotionContext} from 'react-notion-x';

export const getStaticProps = async () => {

  try {
    if (isRedisEnabled) {
      const dateCache = await db.get('date-cache');
      if (isEmpty(dateCache)) {
        await getNotionIds();
      }
    }
    const notionIds = await db.get('created-time');
    const browseTotal = await getBrowseTotal();
    const props = {notionIds, browseTotal};
    return {
      props,
      revalidate: 60
    };
  } catch (err) {
    // ignore redis errors
    console.warn(`redis error get `, err.message);
  }
};
const Created = (props) => {
  const {components, mapPageUrl} = useNotionContext();
  const [notionIds,setNotionIds] =useState(props.notionIds);
  const url = '/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252Fc6c12aa7-8d2e-4714-8b7f-d10388fd7388%252F4kcc0eea3ccfd-d6bd-3cd0-8e41-63ba599fd301.jpg%3Ftable%3Dblock%26id%3D4ee34fae-1079-479d-846a-ed48fac40af0%26cache%3Dv2&w=1920&q=75 1x, /_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252Fc6c12aa7-8d2e-4714-8b7f-d10388fd7388%252F4kcc0eea3ccfd-d6bd-3cd0-8e41-63ba599fd301.jpg%3Ftable%3Dblock%26id%3D4ee34fae-1079-479d-846a-ed48fac40af0%26cache%3Dv2&';

  const changeNotionIds = (key) => {
    const data = {...notionIds}
    data[key]['flag']=!notionIds[key]['flag']
    setNotionIds(data)
  }
  return (
    <LayoutTemp browseTotal={props.browseTotal} LayoutTitle='归档' url={url}>
      <div id='content' className='site-content'>
        <article className='hentry'>
          <div id='archives-temp'>
            <div id='archives-content'>
              {Object.keys(notionIds).map(key => {
                return (
                  <div className='archive-title' key={key}>
                    <span className='ar-time'><i className='iconfont icon-log'/></span>
                    <h3 onClick={()=>changeNotionIds(key)}>{key}</h3>
                    {
                      notionIds[key].flag &&
                      <div  id='monlist' data-date={key} style={{ overflow: 'hidden'}} >
                      {
                        notionIds[key]['children'].map(notion=>{
                          return (
                            <div key={notion.name}>
                              <span className='ar-circle'/>
                              <div className='arrow-left-ar'/>
                              <div className='brick'>
                                <components.PageLink
                                  href={mapPageUrl(notion.id)}>
                                  <span className='time'><i className='iconfont icon-time'/>{notion.date}</span>{notion.name}
                                </components.PageLink>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    }
                  </div>
                );
              })
              }
            </div>
          </div>
        </article>
      </div>
    </LayoutTemp>
  );

};
export default Created;
