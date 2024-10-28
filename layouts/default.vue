<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useUserEmail } from "~/composable/store/store";

useHead({
  title: "サンクチュアリ管理画面",
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    },
  ],
});

if (!useUserEmail().value) {
  useRouter().push("/");
}
</script>

<style>
:root {
  --sanctuary-main-color: #3ad8ff;
  --sanctuary-color-1: #f8f8fd;
  --sanctuary-color-2: #adadad;
  --sanctuary-text-color: #1d1d1d;
  --sanc-box-shadow-color: #dfd9d9;

  --title-text-size: 40px;
  --text-size-l: 30px;
  --text-size-m: 24px;
  --text-size-ms: 20px;
  --text-size-s: 18px;
  --text-size-ss: 12px;
  --van-cell-icon-size: 22px;
  --van-badge-size: 22px;
}

.container {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

/*
  Google Chrome、
  Safari、Microsoft 
  Edge対応のスクロールバー非表示コード
*/

.container::-webkit-scrollbar {
  display: none;
}

/*
* 全体共通
*/

.title {
  margin: 3rem;
  font-size: var(--text-size-l);
}

.van-field {
  font-size: var(--text-size-m);
}

.header-var {
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  margin: 0.5rem;
  border-bottom: solid 3px var(--sanctuary-main-color);
}

.header-content {
  width: 30%;
  font-size: var(--text-size-s);
}

.header-content-title {
  width: 50%;
  font-size: var(--text-size-l);
}

/*
* ログイン画面
*/

.loading-view {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login {
  border: solid 3px var(--sanctuary-main-color);
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 4rem;
  transform: translate(-50%, -50%);
}

.login-btn {
  margin: 0 auto;
  height: 70px;
  width: 350px;
  font-size: var(--text-size-s);
}

/*
* home画面
*/

.menu {
  width: 90%;
}

.menu-title {
  margin: 3rem;
  padding-bottom: 1rem;
  font-size: var(--text-size-l);
}

.menu-sub-title {
  margin: 1em;
  font-size: var(--text-size-s);
  text-align: right;
}

.table-chart {
  border: solid 3px var(--sanctuary-main-color);
  width: 50%;
  margin: 3rem;
  padding: 1rem;
  font-size: var(--text-size-m);
}

/*
* update画面
*/

.update-title-body {
  display: flex;
  margin: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
}

.update-title {
  margin-right: 1em;
  font-size: var(--text-size-s);
}

.update {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.update-body {
  width: 75%;
  height: 55vh;
  border: solid 3px var(--sanctuary-color-2);
  border-radius: 10px;
  padding: 2rem;
  overflow-y: scroll;
}

.update-list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.update-info-body {
  border: solid 3px var(--sanctuary-color-2);
  margin-bottom: 1rem;
  width: 80%;
}

.update-content {
  display: flex;
  align-items: center;
}

.update-index {
  padding: 0 0.5rem;
  font-size: var(--text-size-s);
}

.update-checkbox {
  padding: 0 1rem;
}

.update-info {
  width: 100%;
}

.update-user {
  display: flex;
  align-items: center;
  font-size: var(--text-size-s);
}

.update-user-info {
  font-size: var(--text-size-s);
  margin: 0.5em;
  width: 70%;
}

.update-user-name {
  text-align: left;
}

.update-user-id {
  font-size: var(--text-size-s);
  text-align: left;
  padding-right: 1em;
}

.update-user-name-hira {
  font-size: var(--text-size-ss);
  text-align: left;
}

.update-user-cycle {
  text-align: left;
  width: 90%;
}

.van-badge {
  font-size: var(--text-size-ss);
  width: 70px;
  padding: 5px;
}

/*
* cycle画面
*/

.cycle {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.cycle-carender-select {
  display: flex;
  align-items: center;
  padding: 1em;
  font-size: var(--text-size-m);
}

.cycle-body {
  width: 80%;
  height: 55vh;
  border: solid 3px var(--sanctuary-color-2);
  border-radius: 10px;
  padding: 3rem;
  overflow-y: scroll;
}

.cycle-info {
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 3px var(--sanctuary-color-2);
  padding: 0.5em;
  margin-bottom: 1em;
}

.cycle-user {
  width: 18%;
}

.cycle-user-title {
  width: 10%;
}

.cycle-user-cycle {
  width: 22%;
}

.cycle-info-text {
  font-size: var(--text-size-ms);
  text-align: left;
}

.cycle-info-sub {
  font-size: var(--text-size-s);
  text-align: left;
}

.cycle-select-body {
  font-size: var(--text-size-s);
  padding: 0 0.7em;
}

.this-title {
  font-size: var(--text-size-s);
}

.cycle-carender {
  height: 80%;
  width: 50%;
}

.selected {
  height: 35px;
}

.van-calendar__popup {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
