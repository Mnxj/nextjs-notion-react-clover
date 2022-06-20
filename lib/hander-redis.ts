import {friendPageId} from './config';
import {db} from './db';
import {eq, isEmpty} from 'lodash';
import {getFriends, getNotionCards} from './get-created-notions';

export const getBrowseTotal = async () => await db.get('browse') + 1;

export const getFriend = async (pageId) => {
  let friends = null;
  if (eq(pageId, friendPageId)) {
    friends = await db.get('friend');
    if (isEmpty(friends)) {
      friends = await getFriends();
    }
  }
  return friends;
};

export const getNotionCard = async (pageId) => {
  let notionCard = await db.get('NotionCards');
  if (isEmpty(notionCard)) {
    notionCard = await getNotionCards();
  }
  return {pageId, children: isEmpty(notionCard[pageId]) ? null : notionCard[pageId]};
};
