import * as React from "react";
import * as types from "../lib/types";
import {useState} from "react";
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

  const onChangeQuery = (e) => {
    const query = e.target.value;
    setQuery(query)
    if (!query.trim()) {
      setSearchError(null)
      setSearchResult(null)
      setIsLoading(false)
    } else {
    }
  };
  const search = () => {
    const result = searchNotion({
      query:'vue',
      ancestorId: config.rootNotionPageId,
    });
    console.log(result)

  }


  return (
    <div
      className={isOpenSearch ? 'js-search search-form search-form--modal is-visible' : 'js-search search-form search-form--modal'}>
      <div className="search-form__inner">

        <div>
          <p className="micro mb-" onClick={search}>输入后按回车搜索 ...</p>
          <i className="fa fa-search iconfont icon-search"></i>
          <input
            className="text-input"
            type="search"
            name="keyword"
            placeholder="NotionSearch"
            value={query}
            onChange={onChangeQuery}
          />
        </div>
      </div>
      <div className="search_close" onClick={() => onChangeOpenSearch(false)}/>
    </div>
  )
}
