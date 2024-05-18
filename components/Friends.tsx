import ProgressiveImg from './ProgressiveImg';
import * as React from 'react';


const Friends = ({friends}) => {
  return<div className='links-box'>
    <div className='links-items'>
      <ul>
        {
          Object.keys(friends).map(url => {
            return <li key={url} className='link-item link-item-active'>
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
  </div>
};

export default Friends
