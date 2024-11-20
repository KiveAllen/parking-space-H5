<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="value1" :options="option1"/>
    <van-dropdown-item v-model="value2" :options="option2"/>
  </van-dropdown-menu>

  <van-card
      v-for="(good, index) in goods"
      :key="index"
      :desc="good.desc"
      :price="good.price"
      :thumb="good.thumb"
      :title="good.title"
  >
    <template #tags>
      <van-tag v-for="tag in good.tags" :key="tag" plain type="primary">{{ tag }}</van-tag>
    </template>
    <template #footer>
      <van-button v-for="button in good.buttons" :key="button.text" size="mini" @click="handleClick(button.action)">
        {{ button.text }}
      </van-button>
    </template>
  </van-card>
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


</style>
