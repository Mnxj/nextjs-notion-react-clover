import {parsePageId} from 'notion-utils';
import {ExtendedRecordMap} from 'notion-types';

import * as acl from './acl';
import {
  pageUrlOverrides,
  pageUrlAdditions,
  site,
  appToken
} from './config';
import {getPage} from './notion';
import {getSiteMap} from './get-site-map';
import {getFriend, getNotionCard} from './hander-file';
// import { appendWriteJson, findID, writeJson } from 'components/writeJson';
import { getIdCache } from './fetch-json';
const IdMapPath = 'IDMap.json'
const KeyMapPath = 'KeyMap.json'

export async function resolveNotionPage(domain: string, rawPageId?: string) {
  let pageId: string;
  let recordMap: ExtendedRecordMap;
  let friends = null

  let notionCard = null
  if (rawPageId && rawPageId !== 'index') {
    pageId = parsePageId(rawPageId);
    friends = await getFriend(pageId);
    notionCard = await getNotionCard(pageId);
    if (!pageId) {
      // check if the site configuration provides an override or a fallback for
      // the page's URI
      const override =
        pageUrlOverrides[rawPageId] || pageUrlAdditions[rawPageId];

      if (override) {
        pageId = parsePageId(override);
      }
    }
    const cacheKey = `uri-to-page-id:${domain}:${rawPageId}`;
    if (!pageId) {
      pageId = await getIdCache(KeyMapPath,'key',cacheKey)
      console.log('cacheKey',pageId)
    }
    
    if (pageId) {
      recordMap = await getPage(pageId);
    } else {
      // handle mapping of user-friendly canonical page paths to Notion page IDs
      // e.g., /developer-x-entrepreneur versus /71201624b204481f862630ea25ce62fe
      const siteMap = await getSiteMap();
      pageId = siteMap?.canonicalPageMap[rawPageId];
      if (pageId) {
        recordMap = await getPage(pageId);
        // appendWriteJson(cacheKey, {key: rawPageId,id: pageId})
      } else {
          pageId = await getIdCache(IdMapPath,'title', rawPageId);
          console.log('rawPageId',rawPageId,pageId)
          if(pageId){
            return {
              error: {
                message: `Not found "${rawPageId}"`,
                statusCode: 404
              }
            };
          }
          recordMap = await getPage(pageId);
      }
    }
  } else {
    pageId = site.rootNotionPageId;
    recordMap = await getPage(pageId);
    // let keyArray = []
    // Array(recordMap['block']).forEach(element => {
    //   Object.values(element).forEach(values => {
    //     const properties = Object(values['value']['properties']);
    //     if(properties.hasOwnProperty('F+kB')){
    //       //nextjs-notion-react-clover博客部署教程-2f0f3d3248534cc1ae4ea20006ca6c71
    //       const title = properties['title'][0][0]
    //       const id = values['value']['id']
    //       keyArray.push({id,title});
    //     }
    //   })
    // });
    // writeJson(IdMapPath, keyArray);
  }
 

  const props = {site, appToken, notionCard, recordMap, pageId,friends};
  return {...props, ...(await acl.pageAcl(props))};
}
