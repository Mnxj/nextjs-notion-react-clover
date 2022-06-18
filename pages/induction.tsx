import React, {useState} from 'react';
import {db} from '../lib/db';
import {inductionIcon, isRedisEnabled} from '../lib/config';
import {isEmpty} from 'lodash';
import {getNotionIds} from '../lib/get-created-notions';
import {LayoutTemp} from '../components/LayoutTemp';
import {getBrowseTotal} from '../lib/hander-redis';
import {useNotionContext} from 'react-notion-x';

export const getStaticProps = async () => {

  try {
    let notionIds
    if (isRedisEnabled) {
      notionIds = await db.get('induction');
      if (isEmpty(notionIds)) {
        notionIds = await getNotionIds();
      }
    }
    const browseTotal = await getBrowseTotal();
    const props = {notionIds, browseTotal};
    return {
      props,
      revalidate: 60
    };
  } catch (err) {
    console.warn(`redis error get `, err.message);
    throw err
  }
};
const Induction = (props) => {
  const {components, mapPageUrl} = useNotionContext();
  const [notionIds,setNotionIds] =useState(props.notionIds);

  const changeNotionIds = (key) => {
    const data = {...notionIds}
    data[key]['flag']=!notionIds[key]['flag']
    setNotionIds(data)
  }
  return (
    <LayoutTemp browseTotal={props.browseTotal} LayoutTitle='归档' url={inductionIcon}>
      <div id='content' className='site-content'>
        <article className='hentry'>
          <div id='archives-temp'>
            <div id='archives-content'>
              {Object.keys(notionIds).map(key => {
                return (
                  <div className='archive-title' key={key}>
                    <span className='ar-time'><i className='iconfont icon-calendar1'/></span>
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
export default Induction;
