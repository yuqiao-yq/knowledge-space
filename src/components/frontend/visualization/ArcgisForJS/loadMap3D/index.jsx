/*
 * @Descripttion:
 * @Date: 2022-05-25 20:14:48
 * @LastEditTime: 2022-06-14 16:23:07
 */

import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import './index.css';
/**
 * @description: 初始化map方法
 * @param {*}
 * @return {*}
 */
let initMapFunction = function () {
  return loadModules(
    [
      'esri/Map',
      'esri/layers/MapImageLayer',
      'esri/layers/TileLayer',
      'esri/layers/SceneLayer',
      'esri/views/SceneView',
      'esri/config',
    ],
    {
      url: `https://js.arcgis.com/4.23/`, // 要用绝对路径，这是托管在本地服务器上的地址
      css: `https://js.arcgis.com/4.23/esri/themes/dark/main.css`, // css样式
    },
  ).then(async ([Map, MapImageLayer, TileLayer, SceneLayer, SceneView]) => {
    const MapFunction = {
      Map,
      MapImageLayer,
      TileLayer,
      SceneLayer,
      SceneView,
    };
    initMapFunction = function () {
      return MapFunction;
    };
    return MapFunction;
  });
};

/**
 * @description: 获取政务地图
 * @param {*}
 * @return {*}
 */
let getBaseLayer = async function () {
  const { TileLayer } = await initMapFunction();
  const layer = new TileLayer({
    title: '政务底图',
    effect: 'invert(1) hue-rotate(180deg)', // 滤镜效果
    url: 'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/Spilhaus_Vibrant_Basemap/MapServer',
  });
  getBaseLayer = function () {
    return layer;
  };
  return layer;
};

/**
 * @description: 获取建筑精模
 * @param {*}
 * @return {*}
 */
let getModelLayer = async function () {
  const { SceneLayer } = await initMapFunction();
  const layer = new SceneLayer({
    title: '建筑精模',
    url: `/cehuiyuan/changsanjiao/rest/services/Hosted/HM_BUILDING0826/SceneServer`,
  });
  getBaseLayer = function () {
    return layer;
  };
  return layer;
};

const Map3D = () => {
  useEffect(() => {
    setTimeout(async () => {
      const { Map, SceneView } = await initMapFunction();
      const baseLayer = await getBaseLayer();
      // const modelLayer = await getModelLayer();
      const map = new Map({
        basemap: {
          baseLayers: [baseLayer],
        },
      });
      // map.add(modelLayer);
      const view = new SceneView({
        container: 'Map3D',
        zoom: 2,
        map,
        // camera: {
        //   position: [0.065, -0.09, 0],
        //   tilt: 75,
        //   heading: 0,
        // },
      });
    });
  }, []);
  return <div className="map-container" id="Map3D"></div>;
};

export default Map3D;
