import * as React from 'react';
import {isEmpty} from 'lodash';
import ProgressiveImg from './ProgressiveImg';

export const PageAside: React.FC<{
  pageId: string
  friends: Array<any>
  isBlogPost: boolean
}> = ({pageId, friends, isBlogPost}) => {
  return <>
    {!isEmpty(friends)&&<div className='links-box'>
      <div className='links-items'>
        <ul className='link-items fontSmooth'>
          {
            Object.keys(friends).map(url => {
              return <li key={url} className='link-item link-item-dalao'>
                <a
                  className='link-item-inner effect-apollo'
                  href={url}
                  title={friends[url].description}
                  target='_blank'
                  rel='noreferrer'
                >
                  <ProgressiveImg src={friends[url].icon} alt={friends[url].name}/>
                  <span className='sitename'>{friends[url].name}</span>
                  <div className='linkdes'>{friends[url].description}</div>
                </a>
              </li>;
            })
          }
        </ul>
      </div>
    </div>}
  </>;
};
