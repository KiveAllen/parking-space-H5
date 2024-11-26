<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="typeValue" :options="orderType" @change="getOrderList"/>
    <van-dropdown-item v-model="statusValue" :options="orderStatus" @change="getOrderList"/>
  </van-dropdown-menu>

  <div class="part-container">
    <div v-for="(order, index) in orders"
         :key="index"
         class="part-list">
      <div class="part-item">
        <div class="part-item-name">
          <div class="part-item-name-top">{{ order.name }}</div>
          <div class="part-item-name-bottom">￥{{ order.totalCost }}</div>
        </div>
        <div class="part-item-time">
          <div class="part-item-time-name">
            {{ getOrderStatus(order.reservationStatus) }}
          </div>
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
import {listReservationByPageUsingPost} from "../api/reservationController.ts";

const typeValue = ref(0);
const statusValue = ref(0);

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

  const res = await listReservationByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
    userId: userStore.userInfo.id
  });

  orders.value = res.data.records;
})

const getOrderList = async () => {
  const res = await listReservationByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
    userId: typeValue.value === 0 ? userStore.userInfo.id : undefined,
    ownerId: typeValue.value === 1 ? userStore.userInfo.id : undefined,
    reservationStatus: statusValue.value === 0 ? undefined : statusValue.value,
  });
  orders.value = res.data.records;
}

const getOrderStatus = (status: number) => {
  switch (status) {
    case 1:
      return '已预定';
    case 2:
      return '已完成';
    case 3:
      return '已取消';
    default:
      return '全部订单';
  }
}

const orderType = [
  {text: '我的订单', value: 0},
  {text: '租客订单', value: 1},
];
const orderStatus = [
  {text: '全部订单', value: 0},
  {text: '已预定', value: 1},
  {text: '已完成', value: 2},
  {text: '已取消', value: 3},
];

const orders = ref([])
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
        font-size: 18px;
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
