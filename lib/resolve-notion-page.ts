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
import {db} from './db';
import {getPage} from './notion';
import {getSiteMap} from './get-site-map';
import {getBrowseTotal, getFriend, getNotionCard} from './hander-redis';

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
    const cacheTTL = 8.64e7; // disable cache TTL

    if (!pageId && useUriToPageIdCache) {
      try {
        // check if the database has a cached mapping of this URI to page ID
        pageId = await db.get(cacheKey);
      } catch (err) {
        // ignore redis errors
        console.warn(`redis error get "${cacheKey}"`, err.message);
      }
    }

    if (pageId) {
      recordMap = await getPage(pageId);
    } else {
      // handle mapping of user-friendly canonical page paths to Notion page IDs
      // e.g., /developer-x-entrepreneur versus /71201624b204481f862630ea25ce62fe
      const siteMap = await getSiteMap();
      pageId = siteMap?.canonicalPageMap[rawPageId];

      if (pageId) {
        // TODO: we're not re-using the page recordMap from siteMaps because it is
        // cached aggressively
        // recordMap = siteMap.pageMap[pageId]

        recordMap = await getPage(pageId);

        if (useUriToPageIdCache) {
          try {
            // update the database mapping of URI to pageId
            await db.set(cacheKey, pageId, cacheTTL);

            // console.log(`redis set "${cacheKey}"`, pageId, { cacheTTL })
          } catch (err) {
            // ignore redis errors
            console.warn(`redis error set "${cacheKey}"`, err.message);
          }
        }
      } else {
        // note: we're purposefully not caching URI to pageId mappings for 404s
        return {
          error: {
            message: `Not found "${rawPageId}"`,
            statusCode: 404
          }
        };
      }
    }
  } else {
    pageId = site.rootNotionPageId;
    recordMap = await getPage(pageId);
  }

  const props = {site, appToken, notionCard, recordMap, pageId, browseTotal,friends};
  return {...props, ...(await acl.pageAcl(props))};
}
