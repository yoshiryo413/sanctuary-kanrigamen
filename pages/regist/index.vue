<template>
  <HeaderVar title="新規登録画面" />
  <div v-if="isLoad">
    <Loading :is-load="isLoad" />
  </div>

  <div v-else class="">
    <div>regist</div>
  </div>
</template>

<script setup lang="ts">
import Loading from "~/components/common/Loading.vue";
import HeaderVar from "~/components/common/HeaderVar.vue";

const isLoad = ref(false);
</script>

<style scoped></style>
