import React, { useEffect, useState } from 'react';
// import './index.less';
import watermark from './waterMark';
import dayjs from 'dayjs';

export default function WaterMark() {
  useEffect(() => {
    console.log('添加水印');
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
    watermark.set('水印', `${now}`);
    return () => {
      console.log('移除水印');
      watermark.remove();
    };
  }, []);

  return <div>展示水印</div>;
}
