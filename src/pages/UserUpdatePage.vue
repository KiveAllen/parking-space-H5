<template>
  <van-image :src=avatar></van-image>
  <van-cell-group inset>
    <van-field
        v-model="avatar"
        label="头像"
        placeholder="请输入头像链接"
    />
    <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
    />
    <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
    />

  </van-cell-group>

  <van-button round type="success" @click="submit">保存</van-button>

</template>

<script lang="ts" setup>

import {ref} from 'vue'

const avatar = ref('')
const username = ref('')
const phone = ref('')


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
