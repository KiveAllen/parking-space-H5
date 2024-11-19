<script setup>
import {onMounted, onUnmounted} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "fb26bd68e3810266239fa535b108f0f2",
  };
  AMapLoader.load({
    key: "fbb1c616ee8188f59672b5288f4ed1ec", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0",
    plugins: ["AMap.Scale"],
  })
      .then((AMap) => {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 13, // 初始化地图级别
          center: [114.416456, 23.039525], // 初始化地图中心点位置
        });
      })
      .catch((e) => {
        console.log(e);
      });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
