/*
 * @Descripttion:
 * @Date: 2022-05-25 20:14:48
 * @LastEditTime: 2022-06-15 18:17:58
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
    ['esri/Map', 'esri/layers/SceneLayer', 'esri/views/SceneView', 'esri/config'],
    {
      url: `https://js.arcgis.com/4.23/`, // 要用绝对路径，这是托管在本地服务器上的地址
      css: `https://js.arcgis.com/4.23/esri/themes/dark/main.css`, // css样式
    },
  ).then(async ([Map, SceneLayer, SceneView]) => {
    const MapFunction = {
      Map,
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
 * @description: 获取模型服务
 * @param {*}
 * @return {*}
 */
let getModelLayer = async function () {
  const { SceneLayer } = await initMapFunction();
  const sceneLayer = new SceneLayer({
    url: 'https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/SanFrancisco_Bldgs/SceneServer/layers/0',
    title: 'San Francisco Downtown',
    popupEnabled: false,
  });
  getModelLayer = function () {
    return sceneLayer;
  };
  return sceneLayer;
};

const Map3D = () => {
  useEffect(() => {
    setTimeout(async () => {
      const { Map, SceneView } = await initMapFunction();
      const modelLayer = await getModelLayer();
      const map = new Map({
        basemap: {
          baseLayers: [modelLayer],
        },
      });
      const view = new SceneView({
        container: 'Map3D',
        zoom: 2,
        map,
        camera: {
          position: {
            longitude: -122.38907,
            latitude: 37.7755,
            z: 74.83047,
          },
          heading: 333.84,
          tilt: 92.84,
        },
      });
    });
  }, []);
  return <div className="map-container" id="Map3D"></div>;
};

export default Map3D;
