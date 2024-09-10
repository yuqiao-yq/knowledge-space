/*
 * @Descripttion:
 * @Date: 2022-05-25 20:14:48
 * @LastEditTime: 2022-06-15 18:00:57
 */

import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import * as THREE from 'three';
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
      'esri/views/3d/externalRenderers',
    ],
    {
      url: `https://js.arcgis.com/4.23/`,
      css: `https://js.arcgis.com/4.23/esri/themes/dark/main.css`,
    },
  ).then(async ([Map, MapImageLayer, TileLayer, SceneLayer, SceneView, externalRenderers]) => {
    const MapFunction = {
      Map,
      MapImageLayer,
      TileLayer,
      SceneLayer,
      SceneView,
      externalRenderers,
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

const Map3D = () => {
  useEffect(() => {
    setTimeout(async () => {
      const { Map, SceneView, externalRenderers } = await initMapFunction();
      const baseLayer = await getBaseLayer();
      const map = new Map({
        basemap: {
          baseLayers: [baseLayer],
        },
      });
      const view = new SceneView({
        container: 'Map3D',
        zoom: 2,
        map,
      });

      const threejsRenderer = {
        view: view,
        renderer: null, // three.js 渲染器
        camera: null, // three.js 相机
        scene: null, // three.js 中的场景
        height: 1300, // 高度
        offset: 0, // 偏移量
        material: null,
        mesh: null,
        setup: function (context) {
          this.renderer = new THREE.WebGLRenderer({
            context: context.gl, // 可用于将渲染器附加到已有的渲染环境(RenderingContext)中
            premultipliedAlpha: false, // renderer是否假设颜色有 premultiplied alpha. 默认为true
          });
          this.renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
          this.renderer.setViewport(0, 0, view.width, view.height); // 视口大小设置

          // 防止Three.js清除ArcGIS JS API提供的缓冲区。
          this.renderer.autoClearDepth = false; // 定义renderer是否清除深度缓存
          this.renderer.autoClearStencil = false; // 定义renderer是否清除模板缓存
          this.renderer.autoClearColor = false; // 定义renderer是否清除颜色缓存

          // ArcGIS JS API渲染自定义离屏缓冲区，而不是默认的帧缓冲区。
          // 我们必须将这段代码注入到three.js运行时中，以便绑定这些缓冲区而不是默认的缓冲区。
          const originalSetRenderTarget = this.renderer.setRenderTarget.bind(this.renderer);
          this.renderer.setRenderTarget = function (target) {
            originalSetRenderTarget(target);
            if (target == null) {
              // 绑定外部渲染器应该渲染到的颜色和深度缓冲区
              context.bindRenderTarget();
            }
          };

          this.scene = new THREE.Scene(); // 场景
          this.camera = new THREE.PerspectiveCamera(); // 相机
          // 添加坐标轴辅助工具
          const axesHelper = new THREE.AxesHelper(10000000);
          this.scene.add(axesHelper);
          var geometry = new THREE.BoxGeometry(5000000, 5000000, 5000000);
          this.material = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
          this.mesh = new THREE.Mesh(geometry, this.material);
          this.mesh.position.set(0, 0, 0);
          this.scene.add(this.mesh);
          context.resetWebGLState();
        },
        render: function (context) {
          // 更新相机参数
          const cam = context.camera;
          this.camera.position.set(cam.eye[0], cam.eye[1], cam.eye[2]);
          this.camera.up.set(cam.up[0], cam.up[1], cam.up[2]);
          this.camera.lookAt(new THREE.Vector3(cam.center[0], cam.center[1], cam.center[2]));
          // 投影矩阵可以直接复制
          this.camera.projectionMatrix.fromArray(cam.projectionMatrix);
          // 绘制场景
          this.renderer.state.reset();
          this.renderer.render(this.scene, this.camera);
          // 请求重绘视图。
          externalRenderers.requestRender(view);
          // cleanup
          context.resetWebGLState();
        },
      };
      externalRenderers.add(view, threejsRenderer);
    });
  }, []);
  return <div className="map-container" id="Map3D"></div>;
};

export default Map3D;
