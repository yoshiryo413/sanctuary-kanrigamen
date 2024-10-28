<template>
  <HeaderVar title="更新画面" />

  <div v-if="isLoad">
    <Loading :is-load="isLoad" />
  </div>

  <div v-else class="update">
    <div class="update-title-body">
      <div class="update-title">更新対象者にチェックをつけてください。</div>
      <div class="update-title">選択者: {{ checked.length }}</div>
      <div class="update-title">領収日 : {{ date }}</div>
      <CarenderButton title="受領日選択" :func="() => showCarender()" />
    </div>

    <div class="update-body">
      <div v-for="(update, index) in validUsers" class="update-list">
        <van-badge
          :content="dayConvert.checkExpired(update.expiredDay)"
          class="update-info-body"
          :color="color"
        >
          <div class="update-content">
            <div class="update-checkbox">
              <van-checkbox-group
                v-model="checked"
                shape="square"
                icon-size="30"
              >
                <van-checkbox :name="index">
                  <div class="update-index">No.{{ index + 1 }}</div>
                </van-checkbox>
              </van-checkbox-group>
            </div>

            <van-divider
              class="heiget"
              vertical
              :style="{ borderColor: 'var(--sanctuary-main-color)' }"
            />

            <div class="update-info">
              <van-collapse v-model="activeNames" :border="false">
                <van-collapse-item :name="index">
                  <template #title>
                    <div class="update-user">
                      <div class="update-user-id">
                        ID:{{ useUser.userUpdateId(update.sanctuaryId) }}
                      </div>
                      <div class="update-user-info">
                        <div class="update-user-name-hira">
                          {{ useUser.userKana(update.sanctuaryId) }}
                        </div>
                        <div class="update-user-name">
                          {{ useUser.userUpdateInfo(update.sanctuaryId) }}
                        </div>
                      </div>

                      <div class="update-user-cycle">
                        <div class="update-user-name-hira">直近更新期日：</div>
                        <div>
                          {{ dayConvert.updateStart(update.expiredDay) }} ~
                          {{ update.expiredDay }}
                        </div>
                      </div>
                    </div>
                  </template>
                  <div>以下前回更新</div>
                  <div v-for="list in sortUpdateList(update.updateList)">
                    <div class="update-user-ex-cycle">
                      {{ list.startDay }} ~ {{ list.endDay }}
                    </div>
                  </div>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
        </van-badge>
      </div>
    </div>
    <DecideButton title="更新" :func="() => userUpdate()" />

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
import HeaderVar from "~/components/common/HeaderVar.vue";
import Loading from "~/components/common/Loading.vue";
import { useUsers, useUpdate } from "~/composable/store/store";
import type { Update, UpdateList } from "~/types/allType";
import DecideButton from "~/components/common/DecideButton.vue";
import { useFirebase } from "~/composable/useFirebase";
import CarenderButton from "~/components/common/CarenderButton.vue";
import { useDayConvert } from "~/composable/useDayConvert";
import { useUserName } from "~/composable/useUserName";

const users = useUsers();
const updates = useUpdate();
const fS = useFirebase();
const dayConvert = useDayConvert();
const useUser = useUserName();

const expiredUsers = ref<Update[]>([]);
const validUsers = ref<Update[]>([]);
const checked = ref([]);
const currentDate = new Date();

const isLoad = ref(false);
const show = ref(false);
const activeNames = ref(["1"]);
const color = ref("red");
const date = ref("未選択");

// 本日の日付
const expired = dayjs().format("YYYY/MM/DD");

// onMounted
onMounted(async () => {
  // 30日前の日付を計算
  currentDate.setDate(currentDate.getDate() - 30);
  // 画面用未更新リスト作成
  makeShowList();
});

// Method
const sortUpdateList = (list: UpdateList[]) => {
  const temp = list.sort(
    (a, b) => new Date(a.endDay).getTime() - new Date(b.endDay).getTime()
  );
  return temp;
};

// 更新処理
const userUpdate = async () => {
  showConfirmDialog({
    title: "更新します。よろしいですか？",
  })
    .then(async () => {
      if (date.value === "未選択")
        return showDialog({ title: "受領日が選択されてません。" });
      // on confirm
      const temp = updateUserList();
      isLoad.value = true;
      if (temp.length !== 0) {
        try {
          // 更新
          await fS.updateUser(temp, date.value);
          // 最新updateリストを取得
          updates.value = await useFirebase().getUpdate();
          // 未更新ユーザー
          expiredList();
          // 未更新者
          await fS.notUpdateUser(expiredUsers.value, users.value);
          // チェックリスト初期化
          checked.value = [];
          // 再度リスト作成
          makeShowList();
          isLoad.value = false;
        } catch (e) {
          alert("Error:" + e);
        }
      }
      isLoad.value = false;
    })
    .catch(() => {
      // on cancel
      isLoad.value = false;
    });
  isLoad.value = false;
};

const updateUserList = () => {
  const temp: Update[] = [];
  if (checked.value.length === 0) return temp;
  // 更新者篩にかける
  checked.value.forEach((val) => {
    temp.push(validUsers.value[val]);
  });
  return temp;
};

// 画面表示用リスト
const makeShowList = () => {
  // リストを昇順と未更新者をdisplayから除外
  console.log(updates.value);
  validUsers.value = updates.value
    .sort(
      (a, b) =>
        new Date(a.expiredDay).getTime() - new Date(b.expiredDay).getTime()
    )
    .filter((val) => useUser.isVaildUser(val.sanctuaryId));
};

// 未更新ユーザー
const expiredList = () => {
  expiredUsers.value = updates.value.filter((val) => val.expiredDay < expired);
};

const showCarender = () => {
  show.value = true;
};

const onConfirm = (day: Date) => {
  show.value = false;
  date.value = dayConvert.formatDate(day);
};
</script>

<style scoped>
.van-divider--vertical {
  height: 3em;
}
</style>
