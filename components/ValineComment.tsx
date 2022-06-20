import React, {useEffect} from 'react';
import {isServer} from '../lib/config';
import {config} from '../lib/valine-config';

const buildValine = async (options) => {
  const RealValine = await (await import('valine')).default;
  new RealValine(options);
};
const Valine = ({appId, appKey, path = '', ...others}) => {
  const ref = React.useRef(null);
  useEffect(() => {
    if (!isServer && ref.current) {
      buildValine({
        el: ref.current,
        appId,
        appKey,
        path,
        ...config
      });
    }
  }, [appId, appKey, path, ref]);

  return <div className='valine-box'>
    <span id={path} className='leancloud_visitors' data-flag-title={path}>
      <p><i className='iconfont icon-tianqi-6'/> 曾经也有 <i className='leancloud-visitors-count'> </i> 个和你一样的人来过这里。
      </p>
      </span>
    <div ref={ref} {...others} />
  </div>;
};

export default Valine
