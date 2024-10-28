<template>
  <div v-if="load" class="loading-view">
    <van-loading type="spinner" color="#1989fa" size="100px" />
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  isLoad: Boolean,
});

const load = props.isLoad;
</script>
