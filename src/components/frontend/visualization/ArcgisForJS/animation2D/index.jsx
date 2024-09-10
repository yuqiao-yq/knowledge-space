/*
 * @Descripttion:
 * @Date: 2022-05-25 20:12:06
 * @LastEditTime: 2022-06-14 11:23:53
 */
import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import 点数据 from './点数据.json';
import './index.css';

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
        type: 'simple-marker',
        color: '#1d96ff',
        size: 4,
        outline: { width: 0, color: 'rgba(0, 0, 0, 0)' },
      },
    },
  });
  return geojsonlayer;
};
function createRenderer(time) {
  const opacityStops = [
    {
      opacity: 1,
      value: time,
    },
    {
      opacity: 0,
      value: time + 1,
    },
  ];
  return {
    type: 'simple',
    symbol: {
      type: 'simple-marker',
      size: 4,
      outline: null,
      color: '#1d96ff',
    },
    visualVariables: [
      {
        type: 'opacity',
        field: 'TIME',
        stops: opacityStops,
      },
    ],
  };
}

const Map2D = () => {
  useEffect(() => {
    setTimeout(async () => {
      const { Map, MapView } = await initMapFunction();
      const pointLayer = await getGeoJsonLayer(点数据);
      function animateStart(startTime) {
        let animating = true;
        let time = startTime;
        const frame = () => {
          time += 1;
          pointLayer.renderer = createRenderer(time);
          setTimeout(() => {
            requestAnimationFrame(frame);
          }, 200);
        };
        frame();
        return {
          remove: () => {
            animating = false;
          },
        };
      }
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
      animateStart(1900);
    });
  }, []);
  return <div className="map-container" id="Map2D"></div>;
};

export default Map2D;
