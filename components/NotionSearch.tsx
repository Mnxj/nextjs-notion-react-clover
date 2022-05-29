import * as React from 'react';
import * as types from '../lib/types';
import {useEffect, useMemo, useState} from 'react';
import {debounce} from 'lodash';
import {__spreadValues, mergeGrade, searchNotion} from '../lib/search-notion';
import * as config from '../lib/config'
import {getBlockParentPage, getBlockTitle} from 'notion-utils';
import {defaultPageIcon} from "../lib/config";
import cs from "classnames";
import {useNotionContext} from "react-notion-x";
export const NotionSearch: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock,
  isOpenSearch: boolean,
  onChangeOpenSearch: (boolean) => void
}> = ({block, isOpenSearch, onChangeOpenSearch}) => {
  const [searchResult, setSearchResult] = useState(null)
  const [searchError, setSearchError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const {components, mapPageUrl} = useNotionContext()

  const changeHandler = (value) => {

    setIsLoading(false)
    if (!value.trim()) {
      setSearchResult(null)
      setSearchError(null)
      return
    }
    setIsLoading(true)
    searchNotion({query: value, ancestorId: config.rootNotionPageId,}).then((result) => {
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
      // const searchResultsMap = results.reduce((map, result2) => __spreadProps(__spreadValues({}, map), {
      //   [result2.page.id]: result2
      // }), {});
      searchResults.results = Object.values(mergeGrade(results));
      setSearchResult(searchResults)
    }).catch((error) => {
      setSearchError(error)
    }).finally(() => setIsLoading(false))
    console.log(searchResult)

  };

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), []);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  })

  return (
    <div
      className={isOpenSearch ? 'search-form search-form--modal is-visible' : 'search-form search-form--modal'}>
      <div className='notion-search'>
        <div>
          <p className='micro mb-'>输入后按回车搜索 ...</p>
          {isLoading ? <i className='fa fa-spinner fa-spin fa-3x fa-fw'></i> :
            <i className='fa fa-search icon-search'></i>}
          <input
            className='text-input'
            type='search'
            name='keyword'
            placeholder='Search'
            onChange={(e) => debouncedChangeHandler(e.target.value)}
          />
        </div>
        {!searchResult ? null : <>
          <div className="resultsPane">
            {searchResult.results.map((result) => {
              return (
                <components.PageLink
                  href={mapPageUrl(result.id, searchResult.recordMap)}
                  key={result.id}
                  className={cs("result", "notion-page-link")}
                >
                    <span className="notion-page-title">
                      <div className="notion-page-icon-inline notion-page-icon-image">
                        <img className="notion-page-title-icon notion-page-icon" src={defaultPageIcon}
                             alt={result.title} loading="lazy" decoding="async"/>
                      </div>
                      <span className="notion-page-title-text">{result.title}</span>
                    </span>
                  {result.htmls.map((html: string) => {return (<div className="notion-search-result-highlight" key={html} dangerouslySetInnerHTML={{ __html: html }}/>)})
                  }
                </components.PageLink>
              )
            })
            }
          </div>
          <footer className="resultsFooter">
            <div><span
              className="resultsCount">{searchResult?.total}</span> {searchResult?.total === 1 ? " result" : " results"}
            </div>
          </footer>
        </>
        }
        {!searchError ? null : <div className='noResultsPane'>
          <div className='noResults'>No results</div>
          <div className='noResultsDetail'>Try different search terms</div>
        </div>}
      </div>
      <div className='search_close' onClick={() => onChangeOpenSearch(false)}/>
    </div>
  )
}
