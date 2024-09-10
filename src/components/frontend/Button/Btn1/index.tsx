import React, { useEffect, useState } from 'react';
import './index.less';

const Btn1 = () => {
  return (
    <div className="container">
      <h3>鼠标移入特效</h3>
      <div className="Btn1">
        <button className="btn">确定</button>
        <button className="btn">取消</button>
        <button className="btn">新增</button>
        <button className="btn">删除</button>
      </div>
    </div>
  );
};

export default Btn1;
