<template>
  <div class="header-var">
    <div class="header-content">
      <button class="button" @click="onClickLeft">戻る</button>
    </div>
    <div class="header-content-title">{{ title }}</div>
    <div class="header-content">管理者： {{ userEmail }}</div>
  </div>
</template>

<script setup lang="ts">
import { useUserEmail } from "~/composable/store/store";

// Props
const props = defineProps({
  title: String,
});

// const
const userEmail = useUserEmail();

// Data
const title = props.title;

// Method
const onClickLeft = () => {
  useRouter().go(-1);
};
</script>

<style scoped>
.button {
  cursor: pointer;
  width: 150px;
  height: 50px;
  border-radius: 2em;
  border: 3px solid #414141;
  font-weight: bold;
  color: white;
  background-color: #222222;
  transition: transform 0.3s ease;
}

.button:hover {
  transform: scale(1.15);
  border: none;
  background: linear-gradient(
    -80deg,
    rgb(93, 189, 233) 10%,
    rgb(88, 183, 238) 95%
  );
}

.button:active {
  transform: scale(0.95);
}
</style>
