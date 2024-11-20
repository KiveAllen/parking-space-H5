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
    plugins: ["AMap.Scale", "AMap.PlaceSearch", "AMap.ToolBar", "AMap.Driving"],
  })
      .then((AMap) => {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "2D", // 是否为3D地图模式
          zoom: 13, // 初始化地图级别
          center: [114.416456, 23.039525], // 初始化地图中心点位置
        });

        // 添加工具条
        var toolbar = new AMap.ToolBar(); //创建工具条插件实例
        map.addControl(toolbar); //添加工具条插件到页面
      })
      .catch((e) => {
        console.log(e);
      });
});

onUnmounted(() => {
  map?.destroy();
});

//点标记显示内容
const markerContent = (value) => {
  return `
    <div class="custom-content-marker">
      <img src="public/part.svg"/>
    </div>
    `
}

// 设置经纬度
const setLngLat = (lng, lat) => {
  console.log(lng, lat)
  map?.setCenter([lng, lat]);
};

// 添加点标记
const addMarker = (lng, lat, value) => {
  const marker = new AMap.Marker({
    position: [lng, lat],
    icon: "public/part.svg",
    offset: new AMap.Pixel(-11, -22),
    value: value
  });
  marker.on("click", (e) => {
    console.log(e);
    console.log(value);
  });
  map?.add(marker);
};

// 清空点标记
const clearMarker = () => {
  map?.clearMap();
};

defineExpose({
  setLngLat,
  addMarker,
  clearMarker
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

.custom-content-marker {
  position: relative;
  width: 25px;
  height: 34px;
}

.custom-content-marker img {
  width: 100%;
  height: 100%;
}

</style>
