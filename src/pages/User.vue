<template>
  <van-image src="public/user.jpg"></van-image>
  <van-cell-group>
    <van-cell title="用户名称" value="小幽"/>
    <van-cell title="手机号" value="18312614999"/>
    <van-cell title="用户类型" value="用户"/>
    <van-cell title="注册时间" value="2023-05-05"/>
    <van-cell is-link title="编辑" to="/user/update"/>
  </van-cell-group>


</template>

<script lang="ts" setup>



</script>


<style scoped>


.van-image {
  width: 100px;
  height: 100px;
  left: 50%;
  transform: translate(-50%);

}

:deep(.van-image__img ) {
  border-radius: 50%;

}


</style>
