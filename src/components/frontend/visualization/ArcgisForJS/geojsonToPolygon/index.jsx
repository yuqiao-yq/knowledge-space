/*
 * @Descripttion:
 * @Date: 2022-05-25 20:12:06=
 * @LastEditTime: 2022-06-14 16:09:09
 */
import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import 面数据 from './面数据.json';
import './index.css';

面数据.features = 面数据.features.map((item, key) => {
  item.id = key;
  item.properties = {
    YEAR: item.properties.CNSTRCT_YR,
    VALUE: 'VALUE' + Math.round(Math.random() * (4 - 0) + 0),
  };
  // item.geometry.coordinates= [item.geometry.coordinates[0].map((i,key)=>{
  //   if(key%2==0&&key!=item.geometry.coordinates[0].length-1){
  //     return false
  //   }
  //   return i
  // }).filter((item)=>{
  //   return item
  // })]
  // if(key%2==0&&key!=面数据.features.length-1){
  //   return false
  // }
  return item;
});

// .filter((item)=>{
//   return item
// });

console.log(JSON.stringify(面数据));

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
        type: 'simple-fill',
        color: 'rgba(19, 0, 188, 0.3)',
        outline: { width: 0.4, color: 'rgba(19, 221, 188, 1)' },
      },
    },
  });
  return geojsonlayer;
};

const Map2D = () => {
  useEffect(() => {
    setTimeout(async () => {
      const { Map, MapView } = await initMapFunction();
      const polygonLayer = await getGeoJsonLayer(面数据);
      const map = new Map({
        basemap: {
          baseLayers: [polygonLayer],
        },
      });
      const view = new MapView({
        container: 'Map2D',
        map,
        center: [121.55442185885317, 31.314961752308818],
        constraints: {
          minScale: 500000,
        },
      });
    });
  }, []);
  return <div className="map-container" id="Map2D"></div>;
};

export default Map2D;
