<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          :rules="[{ required: true, message: '请填写用户名' }]"
          label="账号"
          name="userAccount"
          placeholder="请输入账号"
      />
      <van-field
          v-model="userPassword"
          :rules="[{ required: true, message: '请填写密码' }]"
          label="密码"
          name="userPassword"
          placeholder="请输入密码"
          type="password"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button block native-type="submit" round type="primary">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');

const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res, '用户登录');
  if (res.code === 0 && res.data) {
    Toast.success('登录成功');
    // 跳转到之前的页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  } else {
    Toast.fail('登录失败');
  }
};

</script>

<style scoped>

</style>
