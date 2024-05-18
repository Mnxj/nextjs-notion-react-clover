import * as React from 'react';
import {eq, isEmpty} from 'lodash';
import {rootNotionPageId} from '../lib/config';
import Valine from './ValineComment';
import {AppToken} from '../lib/types';
import Friends from './Friends';
import {PageFooterDetail} from './PageFooterDetail';

export const PageFooter: React.FC<{
  pageId: string
  friends: Array<any>
  appToken: AppToken,
  notionCard: any,
  tagsPage:boolean
}> = ({pageId, friends, appToken,notionCard,tagsPage}) => {
  return <>
    {!isEmpty(friends) && <Friends friends={friends}/>}
    {!isEmpty(notionCard)&&!isEmpty(notionCard.children)&& <PageFooterDetail children={notionCard.children} />}
    {!(eq(rootNotionPageId, pageId) || isEmpty(appToken.appId) || isEmpty(appToken.appKey)) && !tagsPage
      && <Valine path={pageId} appId={appToken.appId} appKey={appToken.appKey}/>}
  </>;
};
