import {articlesPageId, friendDatabasePageId, notionId} from './config';
import {Client} from '@notionhq/client';
import { writeJson } from 'components/writeJson';

const notion = new Client({auth: notionId});

export const getNotionIds = async (path) => {
  let results = {};

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
    writeJson(path, {id:'induction',value: results});
  })().catch(err => console.warn(`notion query :`, err.message));
  return results;
};

export const getFriends = async (path) => {
  let results = {};
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
        const link = String(properties.Link.rich_text[0].plain_text);
        results[link]= { icon: properties.Icon.rich_text[0].plain_text, name: properties.Name.title[0].plain_text, description: properties.Description.rich_text[0].plain_text}
      }
    });

    writeJson(path, {id:'friend',value: results});
  })().catch(err => console.warn(`notion query :`, err.message));
  return results;
}

export const getNotionCards = async (path) => {
  let results = {};
  await (async () => {
    const response = await notion.databases.query({
      database_id: articlesPageId,
      "sorts": [
        {
          "timestamp": "created_time",
          "direction": "descending"
        },
      ]
    });

    let notions=[]
    response['results'].forEach(result=>{
      notions.push({
        id: result['id'],
        title: result['properties']['Name']['title'][0]['plain_text'],
        icon: result['cover']['file']['url'],
      })
    });
    results[notions[0]['id']]={up:notions[1]}
    results[notions[notions.length-1]['id']]={next:notions[notions.length-2]}
    for(let i = 1 ; i< notions.length-1 ;i++){
      results[notions[i]['id']]={up:notions[i+1],next:notions[i-1]}
    }
    writeJson(path, {id:'notionCard',value: results});
  })().catch(err => console.warn(`notion query :`, err.message));
  return results;
};

const getMonthOrDay = (created_time: number) => parseInt(String(created_time)) < 10 ? '0' + created_time : created_time;
