import * as React from 'react'
import {domain, isDev} from 'lib/config';
import {getSiteMap} from 'lib/get-site-map'
import {resolveNotionPage} from 'lib/resolve-notion-page';
import {NotionPage} from 'components'
import { Loading } from 'components/Loading';
export const getStaticProps = async (context) => {
  const rawPageId = context.params.pageId as string

  try {
    const props = await resolveNotionPage(domain, rawPageId)

    return { props, revalidate: 60 }
  } catch (err) {
    console.error('page error', domain, rawPageId, err)
    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const siteMap = await getSiteMap()

  return {
    paths: Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
      params: {
        pageId
      }
    })),
    fallback: true
  }
}

export default function NotionDomainDynamicPage(props) {
  if(Object.keys(props).length === 0){
    return <Loading/>
  } else {
    return <NotionPage {...props} />
  }
}
