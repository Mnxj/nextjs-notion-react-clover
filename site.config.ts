import { siteConfig } from './lib/site-config'
import {centerBgIcon} from './lib/config';

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '6ab77d61a8c2442caef446e92376244a',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // articles view page
  articlesPageId: '8c7683ab51b9488e900c5a2b4be49981',

  // tags pageId
  tagsPageId: '9b1dd1f12c414b52ab9ae97ac5202205',

  // friendDatabasePageId is  Friend Link database address pageId
  // friendPageId show friendDatabasePageId
  friendDatabasePageId: '960362aa01f843a0bcd30c41c2e8300e',
  friendPageId: '13686de168794011a4c43f41fc833c89',

  // basic site info (required)
  name: 'Clover',
  domain: 'clover-blog.cn',
  author: '幸いです',

  // update notice info message

  infoMessage:'正在努力更新中...',

  // This is logo

  logo: '/images/log.svg',

  // open graph metadata (optional)
  description: '鼓捣在0和1之间的二货',

  // social usernames (optional)
  zhihu: 'sao-di-seng-78-11',
  github: 'Mnxj',
  bilibili: '57933284',
  wangyiyun: '394247655',
  csdn: 'Adim12',

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: '/favicon.svg',
  defaultPageCoverPosition: 0.5,

  inductionIcon: '/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252Fc6c12aa7-8d2e-4714-8b7f-d10388fd7388%252F4kcc0eea3ccfd-d6bd-3cd0-8e41-63ba599fd301.jpg%3Ftable%3Dblock%26id%3D4ee34fae-1079-479d-846a-ed48fac40af0%26cache%3Dv2&',
  tagsIcon: '/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F7de19ce8-e25c-424a-9cf0-a2a9ca6faa28%252F004630-16460667904dd2.jpeg%3Ftable%3Dblock%26id%3D4ee34fae-1079-479d-846a-ed48fac40af0%26cache%3Dv2&',
  centerBgIcon: '/images/center-bg.gif',
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
  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  navigationLinks: [
    {
      title: 'Search',
      url:'/search',
      span_class: 'faa-parent animated-hover',
      i_class: 'fa fa-search faa-shake',
      is_mobile:true,
    },
    {
      title: 'Tags',
      url:'/tags',
      span_class: 'faa-parent animated-hover',
      i_class: 'iconfont icon-tags1 faa-vertical'
    },
    {
      title: 'Induction',
      url:'/induction',
      span_class: 'faa-parent animated-hover',
      i_class: 'iconfont icon-shounaxiang faa-vertical'
    },
    {
      title: 'Friend',
      pageId: '13686de168794011a4c43f41fc833c89',
      span_class: 'faa-parent animated-hover',
      i_class: 'iconfont icon-link1 faa-shake'
    },
    {
      title: 'RSS',
      url:'/feed',
      span_class: 'faa-parent animated-hover',
      i_class: 'iconfont icon-rss faa-shake'
    },
    {
      title: 'About',
      pageId: '4ee34fae1079479d846aed48fac40af0',
      span_class: 'faa-parent animated-hover',
      i_class: 'iconfont icon-leaf faa-wrench'
    }
  ]
})
