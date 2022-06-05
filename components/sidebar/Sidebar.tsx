import * as React from 'react'
import styles from './Sidebar.module.css'
import { RollList } from '../Header'
import Link from 'next/link';
import {defaultPageIcon} from '../../lib/config';

export const Sidebar = ({ openNav }: { openNav: boolean }) => {
  return (
    <div id='moNav' className={openNav ? styles.moNav : styles.moNavInvalid}>
      <div className={styles.mAvatar}><img src={defaultPageIcon} width="30" height="30"/></div>
      <Link href='/'><p className={styles.moNavP}>Clover</p></Link>
      <p style={{textAlign: 'center', wordSpacing: '20px'}}>
          <a href='https://github.com/Mnxj' rel='noreferrer'  target='_blank'><img src='/images/github.png' alt='github' width='18'/></a>
          <a href='https://space.bilibili.com/57933284' rel='noreferrer'  target='_blank' title='bilibili'><img src='/images/bilibili.png' alt='bilibili' width='18'/></a>
          <a href='https://music.163.com/#/user/home?id=394247655' rel='noreferrer'  target='_blank' title='CloudMusic'><img src='/images/wangyiyun.png' alt='wangyiyun' width='18'/></a>
          <a href='https://www.zhihu.com/people/sao-di-seng-78-11' rel='noreferrer'  target='_blank' title='知乎'><img src='/images/zhihu.png' alt='zhihu' width='18'/></a>
          <a href='https://blog.csdn.net/Adim12?spm=1000.2115.3001.5343' rel='noreferrer'  target='_blank' title='CSDN'><img src='/images/csdn.png' alt='csdn' width='18'/></a>
      </p>
      <hr/>
      <RollList status={true}/>
      <p className={styles.mFooter}>© 2021 幸いです</p>
    </div>
  )
}
