<template>
  <div class="park-detail-name"
       style="font-size: 18px; padding: 20px 20px 0px 20px"
  >{{ address }}
  </div>
  <van-image :src=parkPhoto></van-image>
  <van-cell-group>
    <van-cell
        :value="parkNumber"
        title="停车场区域号"
    />
    <van-cell
        :value="priceType"
        title="价格设置类型"
    />
    <van-cell
        v-if="priceType == '自定义'"
        :value="startDate"
        title="起始时间"

    />
    <van-cell
        v-if="priceType == '自定义'"
        :value="endDate"
        title="结束时间"
    />

    <van-cell
        :value="price"
        title="价格"
    />
  </van-cell-group>

  <van-button v-if="userId==userStore.userInfo.id" round type="primary" @click="toUpdate">修改</van-button>
  <van-button v-else round type="primary" @click="toOrder">预约</van-button>


  <div class="park-detail-name" v-if="feedbackListData.length"
       style="font-size: 18px; padding: 20px 20px 0 20px"
  >评论区
  </div>

  <div v-for="(feedback, index) in feedbackListData"
       :key="index"
       class="comment-list">

    <van-row>
      <van-col span="4">
        <van-image class="comment-user-avatar" :src="feedback.avatar"></van-image>
      </van-col>
      <van-col span="20">
        <div class="comment-user-name">{{ feedback.name }}</div>
        <div class="comment-content">{{ feedback.commentText }}</div>
      </van-col>
    </van-row>
    <van-row justify="space-between">
      <van-col span="12">
        <div class="comment-user-time">{{ formattedCreateTime(feedback.createTime) }}</div>
      </van-col>
      <van-col span="8">
        <van-rate class="comment-content-rating" v-model="feedback.rating" readonly />
      </van-col>
    </van-row>

  </div>

</template>

<script lang="ts" setup>

import {onMounted, ref} from 'vue'
import {getParkingSpaceByIdUsingGet} from "../api/parkingSpaceController.ts";
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "../store/user.ts";
import {listFeedbackByPageUsingPost} from "../api/feedbackController.ts";
import {format} from "date-fns";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const parkPhoto = ref('')
const area = ref('')
const address = ref('')
const parkNumber = ref('')
const price = ref()
const startDate = ref('');
const endDate = ref('');
const priceType = ref();
const userId = ref();
const feedbackListData = ref([]);

const formattedCreateTime = (createTime: string): string => {
  return format(new Date(createTime), 'yyyy-MM-dd HH:mm:ss');
};


onMounted(async () => {
  const res = await getParkingSpaceByIdUsingGet({
    id: route.query.id
  });

  const feedbackList = await listFeedbackByPageUsingPost({
    pageNum: 1,
    pageSize: 100,
    spaceId: route.query.id
  });

  console.log('feedbackList', feedbackList)

  if (feedbackList.data) {
    feedbackListData.value = feedbackList.data.records;
  }


  if (res.data) {
    const areaString = res.data.addressDescription.split('区')[0] + `区`;
    parkPhoto.value = res.data.parkPhoto;
    area.value = areaString;
    address.value = res.data.addressDescription.replace(area, '');
    parkNumber.value = res.data.parkNumber;
    price.value = res.data.price;
    priceType.value = res.data.priceType == 1 ? '日' : res.data.priceType == 2 ? '周' : '自定义';

    if (res.data.customTimeStart && res.data.customTimeEnd) {
      const first = res.data.customTimeStart.split(' ')[1];
      startDate.value = first
      const second = res.data.customTimeEnd.split(' ')[1];
      endDate.value = second
    }

    userId.value = res.data.userId;
  }
})

const toUpdate = () => {
  router.push({
    path: '/park/update',
    query: {
      id: route.query.id,
    }
  })
}

const toOrder = () => {
  router.push({
    path: '/order/add',
    query: {
      id: route.query.id,
    }
  })
}

</script>


<style scoped>


.van-image {
  margin-top: 20px;
  width: 90%;
  height: 250px;
  left: 50%;
  transform: translate(-50%);

}

.van-button {
  margin-top: 20px;
  left: 50%;
  width: 80%;
  transform: translate(-50%);
}

.comment-list {
  border-bottom: 1px solid #ebedf0;
}

.comment-user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.comment-user-name {
  font-size: 14px;
  margin-top: 18px;
  margin-bottom: 5px;
  color: gray;
}

.comment-content {
  font-size: 16px;
}
.comment-user-time{
  margin-left: 10px;
}
.comment-content-rating{

}

</style>
