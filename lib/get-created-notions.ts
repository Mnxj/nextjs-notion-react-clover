import {articlesPageId, friendDatabasePageId, notionId} from './config';
import {Client} from '@notionhq/client';
import {isEmpty} from 'lodash';
import {db} from './db';

const notion = new Client({auth: notionId});
let results = {};

export const getNotionIds = async () => {

  await (async () => {
    const response = await notion.databases.query({
      database_id: articlesPageId,
      filter: {
        'timestamp': 'created_time',
        'created_time': {
          'is_not_empty': true
        }
      }
    });

    response['results'].forEach(result => {
      let created_time = new Date(result['created_time']);
      let monthYear = created_time.getFullYear() + '-' + getMonthOrDay(created_time.getMonth());
      let monthDay = getMonthOrDay(created_time.getMonth()) + '-' + getMonthOrDay(created_time.getDay());
      if (!results[monthYear]) {
        results[monthYear] = {flag: false, children: []};
      }
      results[monthYear].children.push(
        {
          id: result['id'],
          name: result['properties']['Name']['title'][0]['plain_text'],
          date: monthDay
        });
    });
    await setResults(results, 'induction')
  })().catch(err => console.warn(`notion query :`, err.message));
  return results;
};

export const getFriends = async () => {
  (async () => {
    const response = await notion.databases.query({
      database_id: friendDatabasePageId,
      "sorts": [
        {
          "timestamp": "created_time",
          "direction": "ascending"
        },
      ]
    });
    response['results'].forEach(result=>{
      const properties = result['properties']
      if(!properties.Invalid.checkbox){
        const link = properties.Link.rich_text[0].plain_text
        results[link]= { icon: properties.Icon.rich_text[0].plain_text, name: properties.Name.title[0].plain_text, description: properties.Description.rich_text[0].plain_text}
      }
    });
    await setResults(results, 'friend')
  })().catch(err => console.warn(`notion query :`, err.message));
  return results;
}

const setResults = async (results, key) => {
  if (!isEmpty(results)) {
    try {
      await db.set(key, results, 8.64e7);
    } catch (err) {
      console.warn(`redis error :`, err.message);
    }
  }
}


const getMonthOrDay = (created_time: number) => parseInt(String(created_time)) < 10 ? '0' + created_time : created_time;
