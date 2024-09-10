/*
 * @Descripttion:
 * @Date: 2022-05-25 20:12:06
 * @LastEditTime: 2022-06-15 17:23:29
 */
import React, { useEffect, useState } from 'react';
// 先安装 arcgis 官方依赖 esri-loader；这个只是开发依赖,因此可以使用命令 npm i esri-loader --save-dev 来安装;
import { loadModules } from 'esri-loader'; // 用模块的方式引入 esri-loader;
import './index.css';
/**
 * @description: 初始化map方法
 * @param {*}
 * @return {*}
 */
let initMapFunction = function () {
  // 按需加载arcgis 模块
  return loadModules(
    [
      'esri/Map',
      'esri/layers/MapImageLayer', // 动态服务
      'esri/layers/TileLayer', // 切片服务
      'esri/views/MapView', // 2d视图模块
      'esri/views/SceneView', // 3d视图模块
      'esri/config',
    ],
    //定义一个包含有JS API中js开发包和css样式文件的对象
    {
      url: `https://js.arcgis.com/4.23/`, // 要用绝对路径，这是托管在本地服务器上的地址
      css: `https://js.arcgis.com/4.23/esri/themes/dark/main.css`, // css样式
    },
  ).then(async ([Map, MapImageLayer, TileLayer, MapView, SceneView, esriConfig]) => {
    const MapFunction = {
      Map,
      MapImageLayer,
      TileLayer,
      SceneView,
      MapView,
    };
    initMapFunction = function () {
      return MapFunction;
    };
    return MapFunction;
  });
};

/**
 * @description: 获取地图
 * @param {*}
 * @return {*}
 */
let getBaseLayer = async function () {
  // 获取地图
  const { TileLayer } = await initMapFunction();
  const layer = new TileLayer({
    url: 'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/Spilhaus_Vibrant_Basemap/MapServer',
  });
  getBaseLayer = function () {
    return layer;
  };
  return layer;
};
const Map2D = () => {
  useEffect(() => {
    setTimeout(async () => {
      const { Map, MapView } = await initMapFunction();
      const baseLayer = await getBaseLayer(); // 图层
      const map = new Map({
        //实例化地图
        basemap: {
          // 指定一个底图
          baseLayers: [baseLayer],
        },
      });
      const view = new MapView({
        //实例化地图视图
        container: 'Map2D', // 指定存放地图的容器
        zoom: 2, // 设置地图的初始化级别
        map, // 跟实例化的地图做绑定
      });
    });
  }, []);
  return <div className="map-container" id="Map2D"></div>;
};

export default Map2D;
