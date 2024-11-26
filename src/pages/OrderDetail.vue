<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="value1" :options="option1"/>
    <van-dropdown-item v-model="value2" :options="option2"/>
  </van-dropdown-menu>

  <div class="part-container">
    <div v-for="(good, index) in goods"
         :key="index"
         class="part-list">
      <div class="part-item">
        <div class="part-item-name">
          <div class="part-item-name-top">{{ good.title }}</div>
          <div class="part-item-name-bottom">3.5元/小时</div>
        </div>
        <div class="part-item-time">
          <div class="part-item-time-name">已完成</div>
          <van-Button class="part-item-time-time" round size="small" type="primary">查看</van-Button>
        </div>
      </div>
    </div>
  </div>


</template>


<script lang="ts" setup>

import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import {useUserStore} from '../store/user';
import {showFailToast} from "vant";
import {getLoginUserUsingGet} from "../api/userController.ts";

const value1 = ref(0);
const value2 = ref(0);

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  const user = await getLoginUserUsingGet();
  if (user.data) {
    userStore.updateUserInfo(user.data)
  } else {
    showFailToast('获取用户信息失败')
    router.push('/user/login')
  }
})

const option1 = [
  {text: '我的订单', value: 0},
  {text: '租客订单', value: 1},
];
const option2 = [
  {text: '全部订单', value: 0},
  {text: '已预定', value: 1},
  {text: '已完成', value: 2},
  {text: '已取消', value: 3},
];

const goods = [
  {
    desc: "描述信息1",
    price: "2.00",
    thumb: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
    title: "停车场1A32号",
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
    title: "停车场1F32号",
    tags: ["标签3", "标签4"],
    buttons: [
      {text: "按钮3", action: "action3"},
      {text: "按钮4", action: "action4"}
    ]
  }
]
</script>


<style scoped>
.van-dropdown-menu {

  width: 100%;
}

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
        font-size: 18px;
        color: #1296db;
      }

      .part-item-name-bottom {
        font-size: 14px;
        margin-top: 5px;
      }

      .part-item-time-name {
        width: 100%;
        height: 32px;
        color: #000000;
        text-align: right;
      }

      .part-item-time-time {
        font-size: 12px;
        color: #ffffff;
        text-align: right;
      }
    }
  }
}


</style>
