<template>
  <HeaderVar title="サイクル画面" />
  <div v-if="isLoad">
    <Loading :is-load="isLoad" />
  </div>

  <div v-else class="cycle">
    <div class="cycle-carender-select">
      <div>確認するサイクルの終了日を選択してください。</div>
      <CarenderButton title="カレンダー選択" :func="() => showCarender()" />
    </div>

    <div class="cycle-body">
      <div v-for="list in dispList" class="cycle-info">
        <div class="cycle-user">
          <div class="cycle-info-sub">会員id</div>
          <div class="cycle-info-text">{{ list.id }} {{ list.user }}</div>
        </div>

        <div class="cycle-user-title">
          <div class="cycle-info-sub">title</div>
          <div class="cycle-info-text">{{ list.recentTitle }}</div>
        </div>

        <div class="cycle-user-cycle">
          <div class="cycle-info-sub">サイクル終了日</div>
          <div class="cycle-info-text">
            {{ dayConvert.cycleStart(list.recentEndCycle) }} ~
            {{ list.recentEndCycle }}
          </div>
        </div>

        <van-divider
          class="heiget"
          vertical
          :style="{ borderColor: 'var(--sanctuary-main-color)' }"
        />
        <div class="this-title">獲得報酬</div>
        <van-divider
          class="heiget"
          vertical
          :style="{ borderColor: 'var(--sanctuary-main-color)' }"
        />

        <div class="cycle-select-body">
          <div>
            <label for="cycle-select">タイトル:</label>
          </div>
          <select id="cycle-select" v-model="list.nextTitle" class="selected">
            <option disabled value="">未選択</option>
            <option v-for="cycle in rUserTitle" :key="cycle" :value="cycle">
              {{ cycle }}
            </option>
          </select>
        </div>

        <div class="cycle-select-body">
          <div>
            <label for="cycle-select">報酬:</label>
          </div>
          <select id="cycle-select" v-model="list.getReward" class="selected">
            <option disabled value="">0</option>
            <option
              v-for="cycle in userIdType.rewardType(list.id)"
              :key="cycle"
              :value="cycle"
            >
              {{ cycle }}
            </option>
          </select>
        </div>

        <div class="cycle-select-body">
          <div>
            <label for="cycle-select">ポイント:</label>
          </div>
          <select id="cycle-select" v-model="list.getPoint" class="selected">
            <option disabled value="">0</option>
            <option v-for="cycle in rUserPoint" :key="cycle" :value="cycle">
              {{ cycle }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <DecideButton title="決定" :func="() => userCycleUpdate()" />

    <div class="cycle-carender van-custom-popup--bottom">
      <van-calendar
        v-model:show="show"
        class="van-custom-popup--bottom"
        :min-date="currentDate"
        title="カレンダー"
        confirm-text="OK"
        @confirm="onConfirm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import Loading from "~/components/common/Loading.vue";
import HeaderVar from "~/components/common/HeaderVar.vue";
import type { DispCycle } from "~/types/allType";
import { useCycle } from "~/composable/store/store";
import CarenderButton from "~/components/common/CarenderButton.vue";
import { useRCyclePoint } from "~/composable/useCyclePoint";
import DecideButton from "~/components/common/DecideButton.vue";
import { useFirebase } from "~/composable/useFirebase";
import { useDayConvert } from "~/composable/useDayConvert";
import { useUserName } from "~/composable/useUserName";

// const
const cycle = useCycle();
const rUserTitle = useRCyclePoint().titles;
const rUserPoint = useRCyclePoint().points;
const userIdType = useRCyclePoint();
const dayConvert = useDayConvert();
const useUser = useUserName();
const day = dayjs();

const dispCycle = ref<DispCycle[]>([]);
const dispList = ref<DispCycle[]>([]);

const Today = day.format("YYYY/MM/DD");
const isLoad = ref(false);
const date = ref("");
const show = ref(false);
const currentDate = new Date();

// onMounted
onMounted(async () => {
  // 40日前の日付を計算
  currentDate.setDate(currentDate.getDate() - 40);
  // 表示用
  display();
});

// Method
const onConfirm = (day: Date) => {
  show.value = false;
  date.value = dayConvert.formatDate(day);
  dispSort();
};

const showCarender = () => {
  show.value = true;
};

//　画面表示
const display = () => {
  if (dispCycle.value.length === 0) {
    dispCycle.value = cycle.value
      .filter((val) => useUser.isVaildUser(val.sanctuaryId))
      .map((val) => {
        return {
          documentId: val.documentId,
          sanctuaryId: val.sanctuaryId,
          user: useUser.userInfo(val.sanctuaryId),
          id: useUser.userId(val.sanctuaryId),
          recentTitle: val.recentTitle,
          recentEndCycle: val.recentEndCycle,
          nextTitle: "",
          getReward: 0,
          getPoint: 0,
          endCycle: dayConvert.cycleEnd(val.recentEndCycle),
          startCycle: dayConvert.addOneday(val.recentEndCycle),
          isDeliver: val.isDeliver,
        };
      });
  }
  dispSortToday();
};

const dispSortToday = () => {
  dispList.value = dispCycle.value.filter(
    (val) => val.recentEndCycle === Today
  );
};

const dispSort = () => {
  if (date.value !== "") {
    dispList.value = dispCycle.value.filter(
      (val) => val.recentEndCycle === date.value
    );
  }
};

/// サイクル情報更新
const userCycleUpdate = () => {
  showConfirmDialog({
    title: "更新します。よろしいですか？",
  })
    .then(async () => {
      if (dispList.value.length === 0) {
        return showDialog({ title: "更新者がいません。" });
      }

      isLoad.value = true;

      try {
        /// サイクル更新
        useFirebase().updateCycle(dispList.value);
        ///  最新サイクルリストを取得
        cycle.value = await useFirebase().getCycle();

        /// ポイント更新
        useFirebase().addPoint(dispList.value);
        showDialog({ title: "サイクル更新しました。" });
      } catch (e) {
        showDialog({ title: "エラーになりました。再度やりなおしてください。" });
      }
      isLoad.value = false;
    })
    .catch(() => {
      // on cancel
      isLoad.value = false;
      showDialog({ title: "エラーになりました。再度やりなおしてください。" });
    });
  isLoad.value = false;
};
</script>

<style scoped>
.van-divider--vertical {
  height: 3em;
}
</style>
