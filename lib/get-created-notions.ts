import {articlesPageId, notionId} from './config';

import {Client} from '@notionhq/client';
import {isEmpty} from 'lodash';
import {db} from './db';
const notion = new Client({auth: notionId});


export const getNotionIds = async () => {
  await (async () => {
    let results = {};
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
    if (!isEmpty(results)) {
      try {
        await db.set('induction', results, 8.64e7);
      } catch (err) {
        console.warn(`redis error :`, err.message);
      }
    }
  })().catch(err => console.warn(`notion query :`, err.message));
};

const getMonthOrDay = (created_time: number) => parseInt(String(created_time)) < 10 ? '0' + created_time : created_time;
