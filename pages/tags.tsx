import React from 'react';
import {getPage} from '../lib/notion';
import {ExtendedRecordMap} from 'notion-types';
import {isEmpty, random} from 'lodash';
import Link from 'next/link';
import {LayoutTemp} from '../components/LayoutTemp';
import {articlesPageId, tagsIcon, tagsPageId} from '../lib/config';


export const getStaticProps = async () => {
  const recordMap = await getPage(articlesPageId) as ExtendedRecordMap;
  let result;
  for (let recordKey in recordMap['collection_query']) {
    let value = recordMap['collection_query'][recordKey];
    for (let queryKey in value[tagsPageId]) {
      if (queryKey.startsWith('board_columns')) {
        result = value[tagsPageId][queryKey];
      }
    }
  }

  const resultMap = result['results'].filter(item => !isEmpty(item.value.value)).map(item => ({
    key: String(item.value.value),
    total: item.total
  }));
  const props = {resultMap}
  return {
    props,
    revalidate: 60
  };
};
const Tags = (props) => {
  const result =props.resultMap;
  return (
    <LayoutTemp browseTotal={props.browseTotal} LayoutTitle='标签'  url={tagsIcon}>
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
