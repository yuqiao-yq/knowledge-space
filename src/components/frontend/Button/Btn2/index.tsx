// @ts-nocheck
import React from 'react';
import './iconfont.js';
import style from './index.less';

export default function index() {
  return (
    <div className={style.container}>
      <h3>btn2</h3>
      <div className={style.Btn2}>
        <div className={style.items}>
          <a>
            <div className={style.content}>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i>
                <svg className={style.icon} aria-hidden="true">
                  <use xlinkHref="#iconvue"></use>
                </svg>
              </i>
            </div>
            <p>Vue</p>
          </a>
        </div>
        <div className={style.items}>
          <a>
            <div className={style.content}>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i>
                <svg className={style.icon} aria-hidden="true">
                  <use xlinkHref="#iconmusic"></use>
                </svg>
              </i>
            </div>
            <p>Music</p>
          </a>
        </div>
        <div className={style.items}>
          <a>
            <div className={style.content}>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i>
                <svg className={style.icon} aria-hidden="true">
                  <use xlinkHref="#iconvideo"></use>
                </svg>
              </i>
            </div>
            <p>Video</p>
          </a>
        </div>
        <div className={style.items}>
          <a>
            <div className={style.content}>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i>
                <svg className={style.icon} aria-hidden="true">
                  <use xlinkHref="#iconpic"></use>
                </svg>
              </i>
            </div>
            <p>Video</p>
          </a>
        </div>
      </div>
    </div>
  );
}
