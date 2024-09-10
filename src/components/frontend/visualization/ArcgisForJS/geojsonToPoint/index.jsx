/*
 * @Descripttion:
 * @Date: 2022-05-25 20:12:06
 * @LastEditTime: 2022-06-14 16:15:34
 */
import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import 点数据 from './点数据.json';
import './index.css';

// 点数据.features = 点数据.features.map((item, key) => {
//   item.id = key;
//   item.geometry.type="Polygon";
//   item.properties = {
//     TIME: 1900 + Math.round(Math.random() * (120 - 0) + 0),
//     TYPE: 'TYPE' + Math.round(Math.random() * (4 - 0) + 0),
//   };
//   item.geometry.coordinates =[[
//     [item.geometry.coordinates[0]+0.01,item.geometry.coordinates[1]+0.01],
//     [item.geometry.coordinates[0]-0.01,item.geometry.coordinates[1]+0.01],
//     [item.geometry.coordinates[0]-0.01,item.geometry.coordinates[1]-0.01],
//     [item.geometry.coordinates[0]+0.01,item.geometry.coordinates[1]-0.01],
//     [item.geometry.coordinates[0]+0.01,item.geometry.coordinates[1]+0.01]
//   ]]
//     // key % 2 == 0
//     //   ? [
//     //       item.geometry.coordinates[0] * (1 + 0.006 * (Math.random() - 0.6)),
//     //       item.geometry.coordinates[1] * (1 + 0.015 * (Math.random() - 0.9)),
//     //     ]
//     //   : [
//     //       item.geometry.coordinates[0] * (1 + 0.006 * (Math.random() - 0.6)),
//     //       item.geometry.coordinates[1] * (1 + 0.015 * (Math.random() - 0.9)),
//     //     ];
//   return item;
// });

// console.log(JSON.stringify(点数据));
/**
 * @description: 初始化map方法
 * @param {*}
 * @return {*}
 */
var initMapFunction = async function () {
  return loadModules(
    ['esri/Map', 'esri/views/MapView', 'esri/layers/GeoJSONLayer', 'esri/config'],
    {
      url: `https://js.arcgis.com/4.23/`,
      css: `https://js.arcgis.com/4.23/esri/themes/dark/main.css`,
    },
  ).then(async ([Map, MapView, GeoJSONLayer, esriConfig]) => {
    const MapFunction = {
      Map,
      MapView,
      GeoJSONLayer,
      esriConfig,
    };
    initMapFunction = function () {
      return MapFunction;
    };
    return MapFunction;
  });
};

/**
 * @description: geoJSON转Url
 * @param {*} data
 * @return {*}
 */
const geoJSONToUrl = function (data) {
  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  return url;
};

/**
 * @description:将geoJson转成图层
 * @param {*} data
 * @return {*}
 */
const getGeoJsonLayer = async function (data) {
  const { GeoJSONLayer } = await initMapFunction();
  const geojsonlayer = new GeoJSONLayer({
    url: geoJSONToUrl(data),
    renderer: {
      type: 'simple',
      symbol: {
        type: 'simple-marker', // 点数据的样式
        color: '#1d96ff',
        size: 4,
        outline: null,
      },
    },
  });
  return geojsonlayer;
};

const Map2D = () => {
  useEffect(() => {
    setTimeout(async () => {
      const { Map, MapView } = await initMapFunction();
      const pointLayer = await getGeoJsonLayer(点数据);
      const map = new Map({
        basemap: {
          baseLayers: [pointLayer],
        },
      });
      const view = new MapView({
        container: 'Map2D',
        map,
        center: [121.51965576013674, 31.014813865188569],
        constraints: {
          minScale: 500000,
        },
      });
    });
  }, []);
  return <div className="map-container" id="Map2D"></div>;
};

export default Map2D;
