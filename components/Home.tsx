import styles from './styles.module.css'
import {useRef, useState} from "react";

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
        let anchorElement = document.getElementById("notion-page");
        if (anchorElement) {
            anchorElement.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
        <div className={styles.homeTop}>
            <figure className={styles.centerBg}>
                <div className={openVideo?styles.centerContainerInvalid:styles.centerContainer}>
                    <h1 className={styles.centerTitle} data-text="Clover">Clover</h1>
                    <div className={styles.centerInfo}>
                        <p>
                            <i className="fa fa-quote-left"/> 鼓捣在0和1之间的二货<i className="fa fa-quote-right"/>
                        </p>
                        <div className={styles.topSocial}>
                            <li id="bg-pre">
                                <img className="flipx" src="/images/next-b.svg" alt="flipx"/>
                            </li>
                            <li>
                                <a href="https://github.com/Mnxj" rel="noreferrer"  target="_blank"><img src="/images/github.png" alt="github"/></a>
                            </li>
                            <li>
                                <a href="https://space.bilibili.com/57933284" rel="noreferrer"  target="_blank" title="bilibili"><img src="/images/bilibili.png" alt="bilibili"/></a>
                            </li>
                            <li>
                                <a href="https://music.163.com/#/user/home?id=394247655" rel="noreferrer"  target="_blank" title="CloudMusic"><img src="/images/wangyiyun.png" alt="wangyiyun"/></a>
                            </li>
                            <li>
                                <a href="https://www.zhihu.com/people/sao-di-seng-78-11" rel="noreferrer"  target="_blank" title="知乎"><img src="/images/zhihu.png" alt="zhihu"/></a>
                            </li>
                            <li>
                                <a href="https://blog.csdn.net/Adim12?spm=1000.2115.3001.5343" rel="noreferrer"  target="_blank" title="CSDN"><img src="/images/csdn.png" alt="csdn"/></a>
                            </li>
                            <li id="bg-next">
                                <img src="/images/next-b.svg" alt="next-b"/>
                            </li>
                        </div>

                    </div>
                </div>
            </figure>
            <div className={styles.videoContainer}>
                <video
                    id="bg-video"
                    className={playVideo ? styles.bgInvalidVideo : styles.bgVideo}
                    src="/media/thi.cb5608c2.mp4"
                    width="auto"
                    onEnded={videoEnd}
                    ref={videoRef}
                    preload="auto"
                />
                <div id="video-btn" className={openVideo ? styles.videoPause : styles.videoRun}
                     onClick={play}/>
                <div id="video-add"/>
                <div className={(openVideo || playVideo) ? styles.videoStu : styles.videoStu0}>已暂停 ...</div>
            </div>
            <div className={styles.homeTopDown} onClick={gotoContext}>
                <span><i className="fa fa-chevron-down" aria-hidden="true"/></span>
            </div>
        </div>
    );
}
