<template>
  <van-image :src=parkPhoto></van-image>
  <van-cell-group inset>
    <van-field
        v-model="parkPhoto"
        label="车位图片"
        placeholder="请输入图片链接"
    />
    <van-field
        v-model="area"
        is-link
        label="地址地区"
        placeholder="请选择车位所在地区"
        readonly
        @click="areaShow = true"
    />
    <van-field
        v-model="address"
        label="详细地址"
        placeholder="例如：演达大道46号"
    />
    <van-field
        v-model="partNumber"
        label="停车场区域号"
        placeholder="例如：F区23号"
    />
    <van-field
        v-model="priceType"
        is-link
        label="价格设置类型"
        placeholder="选择价格类型"
        readonly
        @click="priceTypePicker = true"
    />
    <van-field
        v-if="priceType == '自定义'"
        v-model="startDate"
        is-link
        label="起始时间"
        placeholder="请选择共享起始日期"
        readonly
        @click="dateStartShow = true"

    />
    <van-field
        v-if="priceType == '自定义'"
        v-model="endDate"
        is-link
        label="结束时间"
        placeholder="请选择共享结束日期"
        readonly
        @click="dateEndShow = true"
    />

    <!--  弹窗  -->
    <van-popup v-model:show="priceTypePicker" position="bottom" round>
      <van-picker
          :columns="priceTypeList"
          @cancel="priceTypePicker = false"
          @confirm="confirmPriceType"
      />
    </van-popup>
    <van-popup v-model:show="areaShow" position="bottom" round>
      <van-cascader
          :options="ChinaAreaData"
          title="请选择所在地区"
          @close="areaShow = false"
          @finish="confirmAreaData"
      />
    </van-popup>

    <van-popup v-model:show="dateStartShow" position="bottom" round>
      <van-time-picker
          v-model="customStartDate"
          title="选择时间"
          @cancel="dateStartShow = false"
          @confirm="confirmStartDate"
      />
    </van-popup>
    <van-popup v-model:show="dateEndShow" position="bottom" round>
      <van-time-picker
          v-model="customEndDate"
          title="选择时间"
          @cancel="dateEndShow = false"
          @confirm="confirmEndDate"
      />
    </van-popup>


  </van-cell-group>

  <van-button round type="success" @click="savePart">保存</van-button>

</template>

<script lang="ts" setup>

import {ref} from 'vue'
import {useCascaderAreaData} from '@vant/area-data';
import {useRoute, useRouter} from "vue-router";


const parkPhoto = ref('')
const area = ref('')
const address = ref('')
const partNumber = ref('')
const customStartDate = ref(['8', '00']);
const startDate = ref('');
const customEndDate = ref(['12', '00']);
const endDate = ref('');
const dateStartShow = ref(false);
const dateEndShow = ref(false);
const areaShow = ref(false);
const ChinaAreaData = useCascaderAreaData();
const priceType = ref('');
const priceTypePicker = ref(false);


const route = useRoute();
const router = useRouter();

const part = ref({
  id: route.query.id

})

const priceTypeList = [
  {text: '日', value: 1},
  {text: '周', value: 2},
  {text: '自定义', value: 3}
];


const confirmAreaData = ({selectedOptions}) => {
  areaShow.value = false;
  area.value = selectedOptions.map((item) => item.text).join('');
};

const confirmPriceType = ({selectedOptions}) => {
  priceTypePicker.value = false;
  priceType.value = selectedOptions[0].text;
};

const confirmStartDate = () => {
  dateStartShow.value = false;
  startDate.value = customStartDate.value.join(':');
}
const confirmEndDate = () => {
  dateEndShow.value = false;
  endDate.value = customEndDate.value.join(':');
}

</script>


<style scoped>


.van-image {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  left: 50%;
  transform: translate(-50%);

}

:deep(.van-image__img ) {
  border-radius: 50%;

}

.van-button {
  margin-top: 20px;
  left: 50%;
  width: 80%;
  transform: translate(-50%);
}


</style>
