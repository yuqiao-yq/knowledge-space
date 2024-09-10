// @ts-nocheck
const idd = '1.234523841642.1234124163';
let _interval = null;
const setWatermark = (str: any, str2: any) => {
  let id = idd;
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }
  // 创建一个画布
  let can = document.createElement('canvas');
  // 设置画布的长宽
  can.width = 300;
  can.height = 200;
  let cans = can.getContext('2d');
  // 设置旋转角度
  // cans.rotate((-20 * Math.PI) / 180);
  // cans.transform(1,0.5,-0.5,1,70,10);
  cans.font = '14px Vedana';
  // 设置填充绘画的颜色、渐变或者模式
  cans.fillStyle = 'rgba(200, 200, 200, 0.5)';
  // 设置文本内容的当前对齐方式
  cans.textAlign = 'center';
  // 设置在绘制文本时使用的当前文本基线
  cans.textBaseline = 'Middle';
  // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  cans.fillText(str, can.width / 3, can.height / 2);
  cans.fillText(str2, can.width / 2.7, can.height / 1.7);
  let div = document.createElement('div');
  div.id = id;
  div.style.pointerEvents = 'none';
  div.style.top = '50px';
  div.style.left = '0px';
  div.style.position = 'fixed';
  div.style.zIndex = '100';
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  const max = Math.max(w, h);
  div.style.width = 2 * max + 'px';
  div.style.height = 2 * max + 'px';
  div.style.transform = `translate(calc(50vw - 50%), calc(50vh - 50%))  rotate(-45deg)`;
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
  document.body.appendChild(div);
  return id;
};

let watermark = {
  // 该方法只允许调用一次
  // 添加水印的方法
  set(str, str2) {
    let id = setWatermark(str, str2);
    _interval = setInterval(() => {
      if (document.getElementById(id) === null) {
        id = setWatermark(str, str2);
      }
    }, 500);
    window.onresize = () => {
      setWatermark(str, str2);
    };
  },
  // 移除水印的方法
  remove() {
    if (document.getElementById(idd) !== null) {
      var box = document.getElementById(idd);
      box.parentNode.removeChild(box);
      _interval ? clearInterval(_interval) : '';
    }
  },
};
export default watermark;
