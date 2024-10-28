<template>
  <div class="menu-sub-title">管理者 : {{ userEmail }}</div>
  <div class="menu-title">サンクチュアリ管理画面</div>

  <div class="menu">
    <van-grid :column-num="3">
      <van-grid-item v-for="btn in buttonNames">
        <CommonMainButton :title="btn.name" :func="() => doNext(btn.path)" />
      </van-grid-item>
    </van-grid>
  </div>

  <div class="table-chart">
    <div>{{ formattedDate }}</div>
    <div></div>
    <div>既存会員数 {{ activeUser().length }}</div>
    <div>更新期日人数</div>
    <div>本日サイクル人数</div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useFirebase } from "~/composable/useFirebase";
import { useMainButtonName } from "~/composable/useButtonName";
import {
  useUserEmail,
  useUsers,
  useCycle,
  useUpdate,
  usePoint,
} from "~/composable/store/store";

// const
const userEmail = useUserEmail();
const users = useUsers();
const cycles = useCycle();
const updates = useUpdate();
const points = usePoint();

const buttonNames = useMainButtonName().categories;
const today = dayjs();

const formattedDate = today.format("YYYY/MM/DD");

// onMounted
onMounted(async () => {
  await getDbData();
});

const getDbData = async () => {
  users.value = await useFirebase().getUser();
  updates.value = await useFirebase().getUpdate();
  cycles.value = await useFirebase().getCycle();
  points.value = await useFirebase().getPoint();
};

// method
const doNext = (path: string) => {
  console.log(path);
  useRouter().push(`/${path}`);
};

const activeUser = () => {
  const tem = users.value.filter((val) => {
    return val.isActive === true;
  });
  return tem;
};
</script>

<style scoped></style>
