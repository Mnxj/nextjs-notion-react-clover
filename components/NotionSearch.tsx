import * as React from "react";
import * as types from "../lib/types";
import {useEffect, useMemo, useState} from "react";
import {debounce} from "lodash";
import {searchNotion} from "../lib/search-notion";
import * as config from '../lib/config'

export const NotionSearch: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock,
  isOpenSearch: boolean,
  onChangeOpenSearch: (boolean)=>void
}> = ({block, isOpenSearch, onChangeOpenSearch}) => {
  const [query, setQuery] = useState('')
  let [searchResult, setSearchResult] = useState(null)
  let [searchError, setSearchError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const changeHandler = (value) => {
    if (!value) return
    setQuery(value)
    const result = searchNotion({
        query,
        ancestorId: config.rootNotionPageId,
    });
    console.log(value)
  };

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), []);

  useEffect(()=>{
    return()=>{
      debouncedChangeHandler.cancel();
    }
  })

  return (
    <div
      className={isOpenSearch ? 'js-search search-form search-form--modal is-visible' : 'js-search search-form search-form--modal'}>
      <div className="search-form__inner">

        <div>
          <p className="micro mb-" >输入后按回车搜索 ...</p>
          <i className="fa fa-search iconfont icon-search"></i>
          <input
            className="text-input"
            type="search"
            name="keyword"
            placeholder="NotionSearch"
            onChange={(e)=>debouncedChangeHandler(e.target.value)}
          />
        </div>
      </div>
      <div className="search_close" onClick={() => onChangeOpenSearch(false)}/>
    </div>
  )
}
