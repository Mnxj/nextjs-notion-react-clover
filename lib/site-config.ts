import * as types from './types'

export interface SiteConfig {
  rootNotionPageId: string
  rootNotionSpaceId?: string
  articlesPageId?:string
  tagsPageId?:string

  name: string
  domain: string
  author: string
  description?: string
  language?: string

  infoMessage?:string

  logo?: string

  github?: string
  zhihu?: string

  defaultPageIcon?: string | null
  defaultPageCoverPosition?: number | null
  inductionIcon?: string | null
  tagsIcon?: string | null

  isPreviewImageSupportEnabled?: boolean
  isTweetEmbedSupportEnabled?: boolean
  isRedisEnabled?: boolean

  includeNotionIdInUrls?: boolean
  pageUrlOverrides?: types.PageUrlOverridesMap
  pageUrlAdditions?: types.PageUrlOverridesMap

  navigationLinks?: Array<NavigationLink>
  Links?:Set<String>
}

export interface NavigationLink {
  title: string
  pageId?: string
  span_class?:string
  i_class?:string
  url?: string
  is_mobile?:boolean
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config
}
