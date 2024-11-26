<template>
  <div class="box">
    <van-button type="primary" @click="setMarker">点标记</van-button>
    <van-button type="primary" @click="clearMarker">清除标记</van-button>
    <van-button type="primary" @click="getLangAndLat">获取当前位置经纬度</van-button>
  </div>
  <div class="container">
    <MapComponent ref="map"/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '../store/user';
import {getLocation} from "../api/mapWebApi.ts";
import MapComponent from "../components/MapComponent.vue";
import {showFailToast} from 'vant';
import {listParkingSpaceByPageUsingPost} from "../api/parkingSpaceController.ts";

const map = ref<InstanceType<typeof MapComponent> | null>(null);

const userStore = useUserStore();
const router = useRouter();


onMounted(async () => {
  console.log("onMounted")
  // 获取用户信息
  if (userStore.isLoggedIn) {
    map.value?.createMap();
  } else {
    showFailToast("未登录，请先登录");
    router.push("/user/login");
  }

})

/**
 * 获取当前位置经纬度
 */
const getLangAndLat = async () => {
  const res = await getLocation("广东省惠州市惠城区南山公园");
  if (res) {
    console.log(res)
    map.value?.setLngLat(res.longitude, res.latitude);
  }
}

/**
 * 添加标记
 */
const setMarker = async () => {
  const res = await listParkingSpaceByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
  });
  if (res.data) {
    for (let i = 0; i < res.data.records.length; i++) {
      const item = res.data.records[i];
      map.value?.addMarker(item.longitude, item.latitude, item);
    }
  }
}

/**
 * 清空标记
 */
const clearMarker = () => {
  map.value?.clearMarker();
}
</script>


<style scoped>
.box {
  position: absolute;
}

.container {
  position: absolute;
  width: 100%;
  height: calc(100% - 90px);
  z-index: -1;
}


</style>
