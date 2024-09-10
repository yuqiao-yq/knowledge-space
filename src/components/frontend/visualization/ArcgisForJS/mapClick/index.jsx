/*
 * @Descripttion:
 * @Date: 2022-05-25 20:12:06
 * @LastEditTime: 2022-06-14 11:24:08
 */
import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import 点数据 from './点数据.json';
import 面数据 from './面数据.json';
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
const getGeoJsonLayer = async function (data, simpleType) {
  const { GeoJSONLayer } = await initMapFunction();
  const color_List = [
    'rgba(29,148,255,1)',
    'rgba(59,235,199,1)',
    'rgba(255,175,94,1)',
    'rgba(196,139,253,1)',
    'rgba(253,66,111,1)',
  ];
  const geojsonlayer = new GeoJSONLayer({
    url: geoJSONToUrl(data),
    // minScale: 300000,
    outFields: ['VALUE'],
    renderer: {
      type: 'unique-value',
      field: 'VALUE',
      defaultSymbol: {
        type: simpleType,
        color: color_List[0],
        size: 4,
        outline: null,
      },
      uniqueValueInfos: [
        {
          value: 'VALUE0',
          symbol: {
            type: simpleType,
            color: color_List[1],
            size: 4,
            outline: null,
          },
        },
        {
          value: 'VALUE1',
          symbol: {
            type: simpleType,
            color: color_List[2],
            size: 4,
            outline: null,
          },
        },
        {
          value: 'VALUE2',
          symbol: {
            type: simpleType,
            color: color_List[3],
            size: 4,
            outline: null,
          },
        },
        {
          value: 'VALUE3',
          symbol: {
            type: simpleType,
            color: color_List[4],
            size: 4,
            outline: null,
          },
        },
        {
          value: 'VALUE4',
          symbol: {
            type: simpleType,
            color: color_List[5],
            size: 4,
            outline: null,
          },
        },
      ],
    },
  });
  return geojsonlayer;
};

const Map2D = () => {
  useEffect(() => {
    setTimeout(async () => {
      const { Map, MapView } = await initMapFunction();
      const pointLayer = await getGeoJsonLayer(点数据, 'simple-marker');
      const polygonLayer = await getGeoJsonLayer(面数据, 'simple-fill');

      const map = new Map({
        basemap: {
          baseLayers: [polygonLayer],
        },
      });
      map.add(pointLayer);
      const view = new MapView({
        container: 'Map2D',
        map,
        center: [121.51965576013674, 31.014813865188569],
        constraints: {
          minScale: 500000,
        },
      });
      view.on('click', async (event) => {
        view.hitTest(event).then((res) => {
          let value = res.results?.[0]?.graphic?.getAttribute('VALUE');
          let type = res.results?.[0]?.graphic?.geometry?.type;
          value ? alert(`点击点的类型为${type},值为${value}`) : '';
        });
      });
    });
  }, []);
  return <div className="map-container" id="Map2D"></div>;
};

export default Map2D;
