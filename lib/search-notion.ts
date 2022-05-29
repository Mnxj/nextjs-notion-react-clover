// import ky from 'ky'
import fetch from 'isomorphic-unfetch'
import pMemoize from 'p-memoize'
import ExpiryMap from 'expiry-map'

import { api } from './config'
import * as types from './types'

export const searchNotion = pMemoize(searchNotionImpl, {
  cacheKey: (args) => args[0]?.query,
  cache: new ExpiryMap(10000)
})

async function searchNotionImpl(
  params: types.SearchParams
): Promise<types.SearchResults> {
  return fetch(api.searchNotion, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res
      }

      // convert non-2xx HTTP responses into errors
      const error: any = new Error(res.statusText)
      error.response = res
      return Promise.reject(error)
    })
    .then((res) => res.json())

  // return ky
  //   .post(api.searchNotion, {
  //     json: params
  //   })
  //   .json()
}

const __defProp = Object.defineProperty;
const __getOwnPropSymbols = Object.getOwnPropertySymbols;
const __hasOwnProp = Object.prototype.hasOwnProperty;
const __propIsEnum = Object.prototype.propertyIsEnumerable;
const __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;

export const  __spreadValues = (a, b) => {
  let prop;
  for (prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};


export const mergeGrade = (results) =>{
  if (!Array.isArray(results)) return []
  const newResults = []
  results.forEach(item => {
    const index = newResults.findIndex(subItem => subItem.id === item.page.id )
    if (index > -1) {
      newResults[index].htmls.push(item.highlight.html)
    } else {
      newResults.push({
        id: item.page.id,
        title: item.title,
        htmls: [item.highlight.html]
      })
    }
  })
  return newResults
}
