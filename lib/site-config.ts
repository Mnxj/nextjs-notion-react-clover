import * as types from './types'

export interface SiteConfig {
  rootNotionPageId: string
  rootNotionSpaceId?: string

  name: string
  domain: string
  author: string
  description?: string
  language?: string

  logo?: string

  github?: string
  zhihu?: string

  defaultPageIcon?: string | null
  defaultPageCover?: string | null
  defaultPageCoverPosition?: number | null

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
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config
}
