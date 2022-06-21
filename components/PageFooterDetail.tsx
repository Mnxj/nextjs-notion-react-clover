import * as React from 'react';
import {isEmpty} from 'lodash';
import ProgressiveImg from './ProgressiveImg';
import {useNotionContext} from 'react-notion-x';
const Img = ({icon,title}) => {
  return <ProgressiveImg src={icon} alt={title} style={{
    position: 'absolute',
    zIndex: 50,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: .6,
    backgroundSize: 'cover'
  }}/>
}
export const PageFooterDetail = ({children}) => {
  const {components, mapPageUrl} = useNotionContext();
  return (<>
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
      <section className='post-squares nextprev'>
        {!isEmpty(children.up) &&
          <div className={isEmpty(children.next) ? 'post-nepre full next' : 'post-nepre half previous'}>
            <components.PageLink href={mapPageUrl(children.up.id)}>
              <Img icon={children.up.icon} title={children.up.title}/>
              <span className='label' data-iname='post.prev'>Previous Post</span>
              <div className='info'><h3>{children.up.title}</h3>
              </div>
            </components.PageLink>
          </div>}
        {!isEmpty(children.next) &&
          <div className={isEmpty(children.up) ? 'post-nepre full next' : 'post-nepre half next'}>
            <components.PageLink href={mapPageUrl(children.next.id)}>
              <Img icon={children.next.icon} title={children.next.title}/>
              <span className='label i18n' data-iname='post.next'>Next Post</span>
              <div className='info'><h3>{children.next.title}</h3>
              </div>
            </components.PageLink>
          </div>}
      </section>
    </>
  );
};
