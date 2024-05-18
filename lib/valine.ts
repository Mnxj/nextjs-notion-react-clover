import React, {useEffect} from 'react';
import {isServer} from '../lib/config';
import {config} from '../lib/valine-config';

export function useValine({appId, appKey, path = '', ...others}){
    const buildValine = async (options) => {
        const RealValine = await (await import('valine')).default;
        new RealValine(options);
      };
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
}