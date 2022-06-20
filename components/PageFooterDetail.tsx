import * as React from 'react';

export const PageFooterDetail = ({notionCard}) => {
  console.log(notionCard)
  return (
    <div className='article-info' id='articleInfo'>
      <div className='single-reward'>
        <div className='reward-open'>
          <span>&nbsp;&nbsp;不给糖就捣乱🐱‍🏍&nbsp;&nbsp;</span>
          <div className='reward-main'>
            <ul className='reward-row'>
              <li className='wechat-code'>
                <img src='/images/weixin.jpg' alt='weixin'/>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='post-license'>
        <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' target='_blank' rel='noopener noreferrer'>
          <i className='iconfont icon-prompt-filling'/>&nbsp;
          <span>知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</span>
        </a>
      </div>
      <hr/>
    </div>
  );
};
