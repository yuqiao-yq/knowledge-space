import React, { useState } from 'react';
import style from './index.module.less';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={style.content}>
      <ul className={style.menu}>
        <li>
          <a href="#page1">第一页</a>
        </li>
        <li>
          <a href="#page2">第二页</a>
        </li>
      </ul>
      <div id="page1" className={`${style.page} ${style.page1}`}>
        {/* <p className={style.desc}>
          <i className={`${style.iconfont} ${style.iconCatFootprint}`}></i>
          小猫咪
        </p>
        <img src="./cat.jpg" className={style.cat} alt="" /> */}
      </div>
      <div id="page2" className={`${style.page} ${style.page2}`}>
        <div className={style.arrow}></div>
        <div className={style.bubble}>这是一个箭头</div>
      </div>
    </div>
  );
};

export default App;
