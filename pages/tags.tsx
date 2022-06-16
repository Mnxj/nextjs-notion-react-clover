import React from 'react';
import {getPage} from '../lib/notion';
import * as config from 'lib/config';
import {ExtendedRecordMap} from 'notion-types';
import {isEmpty, random} from 'lodash';
import Link from 'next/link';
import {LayoutTemp} from '../components/LayoutTemp';
import {getBrowseTotal} from '../lib/hander-redis';


export const getStaticProps = async () => {
  const recordMap = await getPage(config.articlesPageId) as ExtendedRecordMap;
  let result;
  for (let recordKey in recordMap['collection_query']) {
    let value = recordMap['collection_query'][recordKey];
    for (let queryKey in value[config.tagsPageId]) {
      if (queryKey.startsWith('board_columns')) {
        result = value[config.tagsPageId][queryKey];
      }
    }
  }

  const resultMap = result['results'].filter(item => !isEmpty(item.value.value)).map(item => ({
    key: String(item.value.value),
    total: item.total
  }));
  const browseTotal= await getBrowseTotal()
  const props = {resultMap,browseTotal}
  return {
    props,
    revalidate: 60
  };
};
const Tags = (props) => {
  const result =props.resultMap;
  const url = '/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F7de19ce8-e25c-424a-9cf0-a2a9ca6faa28%252F004630-16460667904dd2.jpeg%3Ftable%3Dblock%26id%3D4ee34fae-1079-479d-846a-ed48fac40af0%26cache%3Dv2&'
  return (
    <LayoutTemp browseTotal={props.browseTotal} LayoutTitle='标签'  url={url}>
      <div className='tag-contents'>
        <div id='tags' className='container chip-container'>
          <div className='card'>
            <div className='card-content'>
              <div className='tag-chips'>
                {
                  Object.keys(result).map(index => {
                    return (
                      <Link href={`/tags/${result[index].key}`} key={result[index].key}>
                            <span className='chip' data-tagname={result[index].key}
                                  style={{backgroundColor: 'rgb(' + [random(40, 255), random(40, 255), random(40, 255)].join(',') + ')'}}>{result[index].key}
                              <span className='tag-length'>{result[index].total}</span>
                            </span>
                      </Link>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTemp>
  );

};
export default Tags;
