<template>
  <van-address-edit
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :area-list="areaList"
      :search-result="searchResult"
      show-delete
      show-search-result
      show-set-default
      @delete="onDelete"
      @save="onSave"
      @change-detail="onChangeDetail"
  />

</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {showToast} from 'vant';

const areaList = ref([]);
const searchResult = ref([]);

const onSave = () => showToast('save');
const onDelete = () => showToast('delete');
const onChangeDetail = (val: string) => {
  if (val) {
    searchResult.value = [
      {
        name: '黄龙万科中心',
        address: '杭州市西湖区',
      },
    ];
  } else {
    searchResult.value = [];
  }
};

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
