// @ts-nocheck
import React, { createContext, useEffect, useRef, useState } from 'react';
import style from './index.less';

export default function index() {
  // const [cvs, setCvs] = useState();
  // 获取canvas元素
  useEffect(() => {
    initCanvas();
  }, []);

  const initCanvas = () => {
    let cvs = document.getElementById('bg');
    console.log('cvs', cvs);
    // 获取窗口尺寸
    const width = window.innerWidth;
    const height = window.innerHeight;
    // 设置 canvas 尺寸为窗口尺寸
    cvs.width = width;
    cvs.height = height;
    // 获取绘制上下文
    const ctx = cvs.getContext('2d');

    // 列宽
    const columnWidth = 20;
    // 列数
    const columnCount = Math.floor(window.innerWidth / columnWidth);
    // 记录每列写到了第几个文字
    const columnNextIndexes = new Array(columnCount);
    columnNextIndexes.fill(1);
    // draw(ctx, columnWidth, columnCount, columnNextIndexes);
    setInterval(() => {
      draw(ctx, columnWidth, columnCount, columnNextIndexes);
    }, 40);
  };
  // 绘画的函数
  const draw = (ctx: any, columnWidth: any, columnCount: any, columnNextIndexes: any) => {
    ctx.fillStyle = 'rgba(240, 240, 240, 0.1)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    const fz = 20;
    ctx.fillStyle = getRandomColor();
    ctx.font = `${fz}px "Roboto Mono"`;
    for (let i = 0; i < columnCount; i++) {
      const x = i * columnWidth;
      const y = fz * columnNextIndexes[i];
      ctx.fillText(getRandomChar(), x, y);
      if (y > window.innerHeight && Math.random() > 0.99) {
        columnNextIndexes[i] = 0;
      } else {
        columnNextIndexes[i]++;
      }
    }
  };

  // 随机颜色
  const getRandomColor = () => {
    const fontColors = [
      '#33B5E5',
      '#0099cc',
      '#AA66CC',
      '#9933CC',
      '#99CC00',
      '#669900',
      '#FFBB33',
      '#FF8800',
      '#FF4444',
      '#CC0000',
    ];
    return fontColors[Math.floor(Math.random() * fontColors.length)];
  };

  // 随机文字
  const getRandomChar = () => {
    const str = 'qwertyuiopasdfghjklzxcvbnm!';
    return str[Math.floor(Math.random() * str.length)];
  };

  return (
    <div>
      <canvas id="bg"></canvas>
    </div>
  );
}
