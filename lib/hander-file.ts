import {friendPageId} from './config';
import {eq, isEmpty} from 'lodash';
// import {getFriends, getNotionCards} from './get-created-notions';
// import { findValue } from 'components/writeJson';
import { getCache } from './fetch-json';

export const getFriend = async (pageId) => {
  let friends = null;
  const friendMapPath='FriendMap.json';
  if (eq(pageId, friendPageId)) {
    friends = await getCache(friendMapPath)
    console.log('friends',friends)
    if (isEmpty(friends)) {
      friends = await getFriends(friendMapPath);
    }
  }
  return friends;
};

export const getNotionCard = async (pageId) => {
  const notionCardMapPath='NotionCardMap.json';
  let notionCard = await getCache(notionCardMapPath)
  console.log('notionCard',notionCard)
  if (isEmpty(notionCard)) {
    notionCard = await getNotionCards(notionCardMapPath);
  }
  return {pageId, children: isEmpty(notionCard[pageId]) ? null : notionCard[pageId]};
};
