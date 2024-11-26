<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" name="index" to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="part" to="/part">车位</van-tabbar-item>
    <van-tabbar-item icon="cart-o" name="order" to="/order">订单</van-tabbar-item>
    <van-tabbar-item icon="contact-o" name="user" to="/user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route";

const router = useRouter();
const DEFAULT_TITLE = '私家车车位共享小程序';
const title = ref(DEFAULT_TITLE);

const active = ref(0);

/**
 * 根据路由切换标题
 */
router.beforeEach((to) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => {
  router.back();
};

const onClickRight = () => {
  router.push('/part')
};

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
