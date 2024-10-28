<template>
  <div>
    <button @click="handleClick">
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
button {
  background-color: #eee;
  border: none;
  padding: 1rem;
  font-size: var(--text-size-s);
  width: 12em;
  height: 9em;
  border-radius: 1rem;
  color: var(--sanctuary-text-color);
  box-shadow: 0 0.4rem var(--sanc-box-shadow-color);
  cursor: pointer;
}

button:active {
  color: white;
  box-shadow: 0 0.2rem var(--sanc-box-shadow-color);
  transform: translateY(0.2rem);
}

button:hover:not(:disabled) {
  background: var(--sanctuary-main-color);
  color: var(--sanctuary-text-color);
  text-shadow: 0 0.1rem var(--sanc-box-shadow-color);
}

button:disabled {
  cursor: auto;
  color: grey;
}
</style>
