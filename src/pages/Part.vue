<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="value1" :options="option1"/>
    <van-dropdown-item v-model="value2" :options="option2"/>
  </van-dropdown-menu>

  <van-search
      v-model="value"
      show-action
      label="地址"
      placeholder="请输入前往的地址"
      @search="onSearch"
  >
    <template #action>
      <div @click="onClickButton">搜索</div>
    </template>
  </van-search>

  <div class="par-container">
    <div class="part-list"
         v-for="(good, index) in goods"
         :key="index">
      <div class="part-item">
        <div class="part-item-name">
          <div class="part-item-name-top">{{good.title}}</div>
          <div class="part-item-name-bottom">{{good.price}}</div>
        </div>
        <div class="part-item-go">
          <van-icon class="part-item-go-icon" name="share" />
          <div class="part-item-go-min">{{good.desc}}</div>
        </div>
      </div>
    </div>

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
    title: "商品标题1",
    tags: ["标签1", "标签2"],
    buttons: [
      {text: "按钮1", action: "action1"},
      {text: "按钮2", action: "action2"}
    ]
  },
  {
    desc: "描述信息2",
    price: "3.50",
    thumb: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
    title: "商品标题2",
    tags: ["标签3", "标签4"],
    buttons: [
      {text: "按钮3", action: "action3"},
      {text: "按钮4", action: "action4"}
    ]
  }
]
</script>


<style scoped>
.par-container{
  background-color: #f7f8fa;
  overflow-x: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .part-list {
    width: 100%;
    height: 100px;
    border-radius: 8px;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 20px;

    .part-item{
      display: flex;
      justify-content: space-between;
    }
  }
}




</style>
