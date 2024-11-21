<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="value1" :options="option1"/>
    <van-dropdown-item v-model="value2" :options="option2"/>
  </van-dropdown-menu>

  <van-search
      v-model="value"
      label="地址"
      placeholder="请输入前往的地址"
      show-action
      @search="onSearch"
  >
    <template #action>
      <div @click="onClickButton">搜索</div>
    </template>
  </van-search>

  <div class="part-container">
    <div v-for="(good, index) in goods"
         :key="index"
         class="part-list">
      <div class="part-item">
        <div class="part-item-name">
          <div class="part-item-name-top">{{ good.title }}</div>
          <div class="part-item-name-bottom">3.5元/小时</div>
        </div>
        <div class="part-item-go">
          <van-image class="part-item-go-img" src="public/go.svg"></van-image>
          <div class="part-item-go-min">954m</div>
        </div>
      </div>
    </div>
  </div>

  <div class="add-parking-space">
    <van-button block round size="large" to="/partAdd" type="primary">+</van-button>
  </div>


</template>


<script lang="ts" setup>

import {ref} from 'vue';

const value1 = ref(0);
const value2 = ref(0);

const option1 = [
  {text: '全部车位', value: 0},
  {text: '我的车位', value: 1},
];
const option2 = [
  {text: '默认排序', value: 0},
  {text: '离我最近', value: 1},
];

const goods = [
  {
    desc: "描述信息1",
    price: "2.00",
    thumb: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
    title: "广东省惠州市惠州学院",
    tags: ["标签1", "标签2"],
    buttons: [
      {text: "按钮1", action: "action1"},
      {text: "按钮2", action: "action2"}
    ]
  },
  {
    title: "广东省广州市华南师范大学",
  },
  {
    title: "广东省广州市华南师范大学",
  },
  {
    title: "广东省广州市华南师范大学",
  },
  {
    title: "广东省广州市华南师范大学",
  },
  {
    title: "广东省广州市华南师范大学",
  },
  {
    title: "广东省广州市华南师范大学",
  },
  {
    title: "广东省广州市华南师范大学",
  }
]
</script>


<style scoped>
.part-container {
  background-color: #f7f8fa;
  overflow-x: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 5px;

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

.add-parking-space {
  position: fixed;
  bottom: 60px;
  width: 50px;
  height: 50px;
  left: 50%;
  transform: translateX(-50%);
}


</style>
