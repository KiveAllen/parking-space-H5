<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="partValue" :options="optionPart"/>
    <van-dropdown-item v-model="sortValue" :options="optionSort"/>
  </van-dropdown-menu>

  <van-search
      v-model="address"
      label="地址"
      placeholder="请输入前往的地址"
      show-action
      @search="onSearch"
  >
    <template #action>
      <div @click="onSearch">搜索</div>
    </template>
  </van-search>

  <div class="part-container">
    <div v-for="(part, index) in parts"
         :key="index"
         class="part-list">
      <div class="part-item">
        <div class="part-item-name">
          <div class="part-item-name-top">{{ part.addressDescription }}</div>
          <div class="part-item-name-bottom">3.5元/小时</div>
        </div>
        <div class="part-item-go">
          <van-image class="part-item-go-img" src="public/go.svg"></van-image>
          <!--          <van-button-->
          <!--              size="small"-->
          <!--              style="height: 80%"-->
          <!--              type="primary"-->
          <!--              round-->
          <!--              @click="toUpdate(part.id)"-->
          <!--          >修改车位</van-button>-->
          <div class="part-item-go-min">954m</div>
        </div>
      </div>
    </div>
  </div>

  <div class="add-parking-space">
    <van-button block round size="large" to="/part/add" type="primary">+</van-button>
  </div>


</template>


<script lang="ts" setup>

import {useRouter} from "vue-router";

import {onMounted, ref} from 'vue';
import {listParkingSpaceByPageUsingPost} from "../api/parkingSpaceController.ts";

const partValue = ref(0);
const sortValue = ref(0);
const address = ref('');
const parts = ref([]);

const optionPart = [
  {text: '全部车位', value: 0},
  {text: '我的车位', value: 1},
];
const optionSort = [
  {text: '默认排序', value: 0},
  {text: '离我最近', value: 1},
];

onMounted(async () => {
  const res = await listParkingSpaceByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
  });
  parts.value = res.data.records;
})

const router = useRouter();

const toUpdate = (id: string) => {
  router.push({
    path: '/part/update',
    query: {
      id,
    }
  })
}

const onSearch = async () => {
  const res = await listParkingSpaceByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
  });
  parts.value = res.data.records;
}

</script>


<style scoped>
.part-container {
  background-color: #f7f8fa;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 5px;
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
  overflow-x: scroll;


  .part-list {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 20px;

    .part-item {
      display: flex;
      justify-content: space-between;

      .part-item-name-top {
        width: 100%;
        height: 32px;
        color: #1296db;
      }

      .part-item-name-bottom {
        font-size: 18px;
        margin-top: 3px;
      }

    }
  }
}

.part-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari 和 Opera */
}

.add-parking-space {
  position: fixed;
  bottom: 60px;
  width: 50px;
  height: 50px;
  left: 50%;
  transform: translateX(-50%);
}


</style>
