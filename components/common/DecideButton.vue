<template>
  <div class="button-body">
    <button class="button" @click="handleClick">
      {{ title }}
    </button>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  title: String,
  func: Function,
});

// Data
const title = props.title;

const handleClick = () => {
  if (props.func) {
    props.func();
  }
};
</script>

<style scoped>
.button {
  height: 60px;
  width: 200px;
  cursor: pointer;
  font-size: large;
  font-family: inherit;
  font-weight: bold;
  color: var(--sanctuary-text-color);
  background-color: #f8f8fd;
  padding: 0.8em 2em;
  border-radius: 50em;
  border: 6px solid var(--sanctuary-main-color);
  box-shadow: 0px 8px var(--sanctuary-main-color);
}

.button:active {
  position: relative;
  top: 8px;
  border: 6px solid var(--sanctuary-main-color);
  box-shadow: 0px 0px;
}

.button-body {
  padding: 2rem;
}
</style>
