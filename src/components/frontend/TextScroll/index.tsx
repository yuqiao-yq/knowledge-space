import React, { useEffect, useState, useRef } from 'react';
import style from './index.module.less';

const TextScroll = () => {
  const [itemHeight, setItemHeight] = useState(30);
  let timer: any = null;
  let curIndex = 0;
  useEffect(() => {
    initTextScroll();
    return () => {
      clearInterval(timer);
      console.log('取消定时器');
    };
  }, []);

  const initTextScroll = () => {
    // 将列表中第一个克隆到最后
    cloneFirstEle();
    // 每隔一段时间，将列表滚动到下一位置
    timer = setInterval(moveNext, 2000);
  };
  const cloneFirstEle = () => {
    let firstEle = document.querySelector('#textList')?.children[0];
    // console.log(firstEle);
    let newEle = firstEle?.cloneNode(true) as HTMLElement;
    // console.log(newEle);
    document.querySelector('#textList')?.appendChild(newEle);
  };
  const moveNext = () => {
    // console.log(curIndex);
    let from = curIndex * itemHeight;
    curIndex++;
    let to = curIndex * itemHeight;
    let list = document.querySelector('#textList') as HTMLElement;
    // list.scrollTop = to // 直接变的效果不好
    // 让list的scrollTop从from 变为 to
    let totalDuration = 500; // 变化的总时间
    let durtion = 10; // 每次变化的间隔时间
    let times = totalDuration / durtion; // 变化的次数
    let distance = (to - from) / times; // 每次变化的距离
    let timerId = setInterval(() => {
      from += distance;
      if (from >= to) {
        clearInterval(timerId);
        if (curIndex === list.children.length - 1) {
          from = 0;
          curIndex = 0;
        }
      }
      list.scrollTop = from;
    }, durtion);
  };

  return (
    <div className={style.container}>
      <div className={style.title}>春江花月夜</div>
      <div className={style.textList} id="textList">
        <div className={style.cell}>春江潮水连海平，海上明月共潮生。</div>
        <div className={style.cell}>滟滟随波千万里，何处春江无月明。</div>
        <div className={style.cell}>江流宛转绕芳甸，月照花林皆似霰。</div>
        <div className={style.cell}>空里流霜不觉飞，汀上白沙看不见。</div>
        <div className={style.cell}>江天一色无纤尘，皎皎空中孤月轮。</div>
        <div className={style.cell}>江畔何人初见月？江月何年初照人？</div>
        <div className={style.cell}>人生代代无穷已，江月年年望相似。</div>
        <div className={style.cell}>不知江月待何人，但见长江送流水。</div>
      </div>
    </div>
  );
};

export default TextScroll;
