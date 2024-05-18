import * as React from 'react';
import {domain} from 'lib/config';
import {resolveNotionPage} from 'lib/resolve-notion-page';
import {NotionPage} from 'components';
import {db} from '../lib/db';
import * as types from '../lib/types';
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain) as types.PageProps;
    await db.set('browse', props.browseTotal);
    return {props, revalidate: 60};
  } catch (err) {
    console.error('page error', domain, err);

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err;
  }
};

export default function NotionDomainPage(props) {
  console.log('index',props);
  const router = useRouter();
    // 监听路由变化
    React.useEffect(() => {
      router.events.on('routeChangeStart', () => {
        console.log('index路由开始变化');
      });
      router.events.on('routeChangeComplete', () => {
        console.log('index路由变化完成');
      });
      router.events.on('routeChangeError', () => {
        console.log('index路由变化出错');
      });
      router.events.on('beforeHistoryChange', () => {
        console.log('indexbeforeHistoryChange');
      });
    }, [router]);
  return <NotionPage  {...props} />
}
