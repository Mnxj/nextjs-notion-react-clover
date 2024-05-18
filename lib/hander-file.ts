import {friendPageId} from './config';
import {db} from './db';
import {eq, isEmpty} from 'lodash';
import {getFriends, getNotionCards} from './get-created-notions';
import { findValue } from 'components/writeJson';

export const getFriend = async (pageId) => {
  let friends = null;
  const friendMapPath='FriendMap.json';
  if (eq(pageId, friendPageId)) {
    friends = await findValue(friendMapPath,'friend')
    if (isEmpty(friends)) {
      friends = await getFriends(friendMapPath);
      
    }
  }
  return friends;
};

export const getNotionCard = async (pageId) => {
  const notionCardMapPath='NotionCardMap.json';
  let notionCard = await findValue(notionCardMapPath,'notionCard')
  if (isEmpty(notionCard)) {
    notionCard = await getNotionCards(notionCardMapPath);
  }
  return {pageId, children: isEmpty(notionCard[pageId]) ? null : notionCard[pageId]};
};
