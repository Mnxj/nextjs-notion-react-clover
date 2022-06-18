import * as React from 'react';
import {eq} from 'lodash';

export const PageAside: React.FC<{
  pageId: string
  isBlogPost: boolean
}> = ({pageId, isBlogPost}) => {
  const isFriend = eq(pageId,'13686de1-6879-4011-a4c4-3f41fc833c89')
  console.log(isFriend)
  return <div id='vcomments'/>;
};
