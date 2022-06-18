import styles from './styles.module.css'
import {useRef, useState} from 'react';
import {bilibili, csdn, description, github, infoMessage, name, wangyiyun, zhihu} from '../lib/config';
import ProgressiveImg from './ProgressiveImg';
import {centerBg} from '../lib/fonts';

export const HomeTop = () => {
    const [openVideo, setOpenVideo] = useState(false);
    const [playVideo, setPlayVideo] = useState(true);
    const videoRef = useRef(null)


    const play = () => {
        if (!openVideo) {
            setPlayVideo(false)
            // @ts-ignore
            videoRef.current.play()
        } else {
            // @ts-ignore
            videoRef.current.pause()
        }
        setOpenVideo(!openVideo)
    }

    const videoEnd = () => {
        setPlayVideo(true)
        setOpenVideo(!openVideo)
    }

    const gotoContext = () => {
        let anchorElement = document.getElementById('notion-page');
        if (anchorElement) {
            anchorElement.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
      <>
        <div className={styles.homeTop}>
            <figure className={styles.centerBg}>
                <div className={openVideo?styles.centerContainerInvalid:styles.centerContainer}>
                    <h1 className={styles.centerTitle} data-text={name}>{name}</h1>
                    <div className={styles.centerInfo}>
                        <p>
                            <i className='fa fa-quote-left'/>{description}<i className='fa fa-quote-right'/>
                        </p>
                        <div className={styles.topSocial}>
                            <li id='bg-pre'>
                                <img className={styles.bgPre} src='/images/next-b.svg' alt='next-p'/>
                            </li>
                            <li>
                                <a href={`https://github.com/${github}`} rel='noreferrer'  target='_blank'><img src='/images/github.png' alt='github'/></a>
                            </li>
                            <li>
                                <a href={`https://space.bilibili.com/${bilibili}`} rel='noreferrer'  target='_blank' title='bilibili'><img src='/images/bilibili.png' alt='bilibili'/></a>
                            </li>
                            <li>
                                <a href={`https://music.163.com/#/user/home?id=${wangyiyun}`} rel='noreferrer'  target='_blank' title='CloudMusic'><img src='/images/wangyiyun.png' alt='wangyiyun'/></a>
                            </li>
                            <li>
                                <a href={`https://www.zhihu.com/people/${zhihu}`} rel='noreferrer'  target='_blank' title='知乎'><img src='/images/zhihu.png' alt='zhihu'/></a>
                            </li>
                            <li>
                                <a href={`https://blog.csdn.net/${csdn}`} rel='noreferrer'  target='_blank' title='CSDN'><img src='/images/csdn.png' alt='csdn'/></a>
                            </li>
                            <li id='bg-next'>
                                <img src='/images/next-b.svg' alt='next-b'/>
                            </li>
                        </div>

                    </div>
                </div>
                <ProgressiveImg src={centerBg} alt='home' style={{ width: '100%',height: '100%',position: 'absolute',top: '0px'}}/>
            </figure>
            <div className={styles.videoContainer}>
                <video
                    id='bg-video'
                    className={playVideo ? styles.bgInvalidVideo : styles.bgVideo}
                    src='/media/thi.cb5608c2.mp4'
                    width='auto'
                    onEnded={videoEnd}
                    ref={videoRef}
                    preload='auto'
                />
                <div id='video-btn' className={openVideo ? styles.videoPause : styles.videoRun}
                     onClick={play}/>
                <div id='video-add'/>
                <div className={(openVideo || playVideo) ? styles.videoStu : styles.videoStu0}>已暂停 ...</div>
            </div>
            <div className={styles.homeTopDown} onClick={gotoContext}>
                <span><i className='iconfont icon-down' aria-hidden='true'/></span>
            </div>
        </div>
        <div className={styles.notice}>
          <div className={styles.noticeCenter}>
            <i className='iconfont icon-notice'/>
            <div className='notice-content'>{infoMessage}</div>
          </div>
        </div>
      </>
    );
}
