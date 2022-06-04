import {Block} from 'notion-types';
import {defaultMapImageUrl} from 'react-notion-x';

import {defaultPageIcon} from './config';

export const mapImageUrl = (url: string, block: Block) => {
  if (url === defaultPageIcon) {
    return url;
  }

  return defaultMapImageUrl(url, block);
};
