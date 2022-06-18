import * as React from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {debounce, isEmpty} from 'lodash';
import {__spreadValues, mergeGrade, searchNotion} from '../lib/search-notion';
import {getBlockParentPage, getBlockTitle} from 'notion-utils';
import {defaultPageIcon, rootNotionPageId} from '../lib/config';
import cs from 'classnames';
import {useNotionContext} from 'react-notion-x';

export const NotionSearch = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {components, mapPageUrl} = useNotionContext();

  const changeHandler = useCallback((value) => {

    setIsLoading(false);
    if (!value.trim()) {
      changeEmpty(null);
      return;
    }
    setIsLoading(true);
    searchNotion({query: value, ancestorId: rootNotionPageId}).then((result) => {
      let searchResults = __spreadValues({}, result);
      const results = searchResults.results.map((result2) => {
        let _a, _b;
        const block = (_a = searchResults.recordMap.block[result2.id]) == null ? void 0 : _a.value;
        if (!block)
          return;
        const title = getBlockTitle(block, searchResults.recordMap);
        if (!title) {
          return;
        }
        result2.title = title;
        result2.block = block;
        result2.recordMap = searchResults.recordMap;
        result2.page = getBlockParentPage(block, searchResults.recordMap, {
          inclusive: true
        }) || block;
        if (!result2.page.id) {
          return;
        }
        if ((_b = result2.highlight) == null ? void 0 : _b.text) {
          result2.highlight.html = result2.highlight.text.replace(/<gzkNfoUU>/gi, '<b style="color: rgba(245, 158, 11, 1)">').replace(/<\/gzkNfoUU>/gi, '</b>');
        }
        return result2;
      }).filter(Boolean);
      searchResults.results = Object.values(mergeGrade(results));
      setSearchResult(searchResults);
      if (searchResults.total === 0) {
        changeEmpty('error');
      }
    }).catch((error) => {
      changeEmpty(error);
    }).finally(() => setIsLoading(false));
  },[]);

  const changeEmpty = (error) => {
    setSearchResult(null);
    setSearchError(error);
  };

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [changeHandler]);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  });

  return (
    <div className='notion-search'>
      <div>
        <p className='micro mb-'>输入后按回车搜索 ...</p>
        {isLoading ? <i className='iconfont icon-loading2 loading'/> :
          <i className='iconfont icon-search'/>}
        <input
          className='text-input'
          type='search'
          name='keyword'
          placeholder='Search'
          onChange={(e) => debouncedChangeHandler(e.target.value)}
        />
      </div>
      {isEmpty(searchResult) ?
        null
        : <>
          <div className='resultsPane'>
            {searchResult.results.map((result) => {
              return (
                <components.PageLink
                  href={mapPageUrl(result.id, searchResult.recordMap)}
                  key={result.id}
                  className={cs('result', 'notion-page-link')}
                >
                    <span className='notion-page-title'>
                      <div className='notion-page-icon-inline notion-page-icon-image'>
                        <img className='notion-page-title-icon notion-page-icon' src={defaultPageIcon}
                             alt={result.title} loading='lazy' decoding='async'/>
                      </div>
                      <span className='notion-page-title-text'>{result.title}</span>
                    </span>
                  {result.htmls.map((html: string) => {
                    return (<div className='notion-search-result-highlight' key={html}
                                 dangerouslySetInnerHTML={{__html: html}}/>);
                  })
                  }
                </components.PageLink>
              );
            })
            }
          </div>
          <footer className='resultsFooter'>
            <div><span
              className='resultsCount'>{searchResult?.total}</span> {searchResult?.total === 1 ? ' result' : ' results'}
            </div>
          </footer>
        </>
      }
      {isEmpty(searchError) ? null : <div className='noResultsPane'>
        <div className='noResults'>No results</div>
        <div className='noResultsDetail'>Try different search terms</div>
      </div>}
    </div>
  );
};
