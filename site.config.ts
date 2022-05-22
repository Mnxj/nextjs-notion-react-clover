import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '6ab77d61a8c2442caef446e92376244a',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: undefined,

  // basic site info (required)
  name: 'clover-blog',
  domain: 'clover-blog.cn',
  author: '幸いです',

  // This is logo

  logo: '/images/log.svg',

  // open graph metadata (optional)
  description: '快速响应的前端页面',

  // social usernames (optional)
  zhihu: 'sao-di-seng-78-11',
  github: 'Mnxj',

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: true,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: undefined,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  navigationLinks: [
    {
      title: 'Tags',
      pageId: 'f1199d37579b41cbabfc0b5174f4256a',
      span_class: 'faa-parent animated-hover',
      i_class: 'fa fa-list-ul faa-vertical'
    },
    {
      title: 'Friend',
      pageId: 'f1199d37579b41cbabfc0b5174f4256a',
      span_class: 'faa-parent animated-hover',
      i_class: 'fa fa-link faa-shake'
    },
    {
      title: 'rssHub',
      pageId: 'fbca42d53f4c48fcb6cc315a8ed3775b',
      span_class: 'faa-parent animated-hover',
      i_class: 'fa fa-rss faa-shake'
    },
    {
      title: 'About',
      pageId: '4ee34fae1079479d846aed48fac40af0',
      span_class: 'faa-parent animated-hover',
      i_class: 'fa fa-leaf faa-wrench'
    }
  ]
})
