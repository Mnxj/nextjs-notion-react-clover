import {parsePageId} from 'notion-utils';
import {ExtendedRecordMap} from 'notion-types';

import * as acl from './acl';
import {
  pageUrlOverrides,
  pageUrlAdditions,
  environment,
  site,
  appToken
} from './config';
import {getPage} from './notion';
import {getSiteMap} from './get-site-map';
import {getBrowseTotal, getFriend, getNotionCard} from './hander-redis';
import { appendWriteJson, findID, writeJson } from 'components/writeJson';
const IdMapPath = 'IDMap.json'
const KeyMapPath = 'KeyMap.json'

export async function resolveNotionPage(domain: string, rawPageId?: string) {
  let pageId: string;
  let recordMap: ExtendedRecordMap;
  let browseTotal = await getBrowseTotal();
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
    const useUriToPageIdCache = true;
    const cacheKey = `uri-to-page-id:${domain}:${environment}:${rawPageId}`;
    // TODO: should we use a TTL for these mappings or make them permanent?
    // const cacheTTL = 8.64e7 // one day in milliseconds

    if (!pageId && useUriToPageIdCache) {
      pageId = findID(KeyMapPath,cacheKey)
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
        if (useUriToPageIdCache) {
          appendWriteJson(KeyMapPath, {key: cacheKey,id: pageId})
        }
      } else {
          pageId = findID(IdMapPath, encodeURI(rawPageId));
          console.log('pageId',pageId)
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
    let keyArray = []
    Array(recordMap['block']).forEach(element => {
      Object.values(element).forEach(values => {
        const properties = Object(values['value']['properties']);
        if(properties.hasOwnProperty('F+kB')){
          //nextjs-notion-react-clover博客部署教程-2f0f3d3248534cc1ae4ea20006ca6c71
          const title = properties['title'][0][0]
          const id = values['value']['id']
          keyArray.push({id,title});
        }
      })
    });
    console.log('keyArray',keyArray)
    writeJson(IdMapPath, keyArray);
  }
 

  const props = {site, appToken, notionCard, recordMap, pageId, browseTotal,friends};
  return {...props, ...(await acl.pageAcl(props))};
}
