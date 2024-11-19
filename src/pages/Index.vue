<template>
  <div class="container">
    <MapComponent/>
  </div>
</template>

<script lang="ts" setup>
import {watchEffect} from 'vue';
import MapComponent from "../components/MapComponent.vue";


/**
 * 加载数据
 */
const loadData = async () => {

}

watchEffect(() => {
  loadData();
})

</script>


<style scoped>

.container {
  position: absolute;
  width: 100%;
  height: 100%;
}


</style>
