import {isRedisEnabled} from './config';
import {db} from './db';

export const getBrowseTotal = async () => {
  let browseTotal = 0;
  browseTotal = browseTotal + 1;
  if (isRedisEnabled) {
    browseTotal = await db.get('browse');
  }
  return browseTotal;
}
