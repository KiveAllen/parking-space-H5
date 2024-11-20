<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="value1" :options="option1"/>
    <van-dropdown-item v-model="value2" :options="option2"/>
  </van-dropdown-menu>

  <van-card
      desc="描述信息"
      num="2"
      price="2.00"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      title="商品标题"
  >
    <template #tags>
      <van-tag plain type="primary">标签</van-tag>
      <van-tag plain type="primary">标签</van-tag>
    </template>
    <template #footer>
      <van-button size="mini">按钮</van-button>
      <van-button size="mini">按钮</van-button>
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
</script>


<style scoped>


</style>
