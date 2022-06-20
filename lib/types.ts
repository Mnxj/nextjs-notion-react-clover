import { ExtendedRecordMap, PageMap } from 'notion-types'

export * from 'notion-types'

export interface PageError {
  message?: string
  statusCode: number
}

export interface PageProps {
  site?: Site
  appToken?: AppToken,
  recordMap?: ExtendedRecordMap
  notionCard?: any
  pageId?: string
  browseTotal?:number
  error?: PageError
  tagsPage?: boolean
  friends?: Array<any>
  propertyToFilterName?: string
}

export interface AppToken {
  appId?: string,
  appKey?: string,
}

export interface Site {
  name: string
  domain: string

  rootNotionPageId: string
  rootNotionSpaceId: string
  articlesPageId:string

  // settings
  html?: string
  fontFamily?: string
  darkMode?: boolean
  previewImages?: boolean

  // opengraph metadata
  description?: string
  image?: string
}

export interface SiteMap {
  site: Site
  pageMap: PageMap
  canonicalPageMap: CanonicalPageMap
}

export interface CanonicalPageMap {
  [canonicalPageId: string]: string
}

export interface PageUrlOverridesMap {
  // maps from a URL path to the notion page id the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pagePath: string]: string
}

export interface PageUrlOverridesInverseMap {
  // maps from a notion page id to the URL path the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pageId: string]: string
}
