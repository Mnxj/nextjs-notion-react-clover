import {isRedisEnabled} from './config';
import {db} from './db';

export const getBrowseTotal = async () => {
  let browseTotal = 0;
  if (isRedisEnabled) {
    browseTotal = await db.get('browse');
  }
  browseTotal = browseTotal + 1;
  return browseTotal;
}
