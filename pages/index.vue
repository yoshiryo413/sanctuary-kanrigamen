<template>
  <div v-if="isLoad">
    <Loading :is-load="isLoad" />
  </div>
  <div v-else class="login">
    <div class="title">サンクチュアリ管理画面</div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          id="email-field"
          v-model="email"
          name="email"
          label="email"
          placeholder="email"
          :rules="[{ required: true, message: 'emailが記載ありません。' }]"
        />
        <van-field
          id="password-field"
          v-model="password"
          type="password"
          name="Password"
          label="Password"
          placeholder="Password"
          :rules="[{ required: true, message: 'Passwordが記載ありません' }]"
        />
      </van-cell-group>
      <div style="margin: 4rem">
        <van-button
          class="login-btn"
          round
          block
          type="primary"
          native-type="submit"
        >
          ログイン
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import Loading from "~/components/common/Loading.vue";
import { useUserEmail } from "~/composable/store/store";
import { useFirebase } from "~/composable/useFirebase";

// const
const userEmail = useUserEmail();

// date
const email = ref("");
const password = ref("");
const isLoad = ref(false);

// method
const onSubmit = async () => {
  isLoad.value = true;
  // ログイン
  try {
    await useFirebase().useAuth(email.value, password.value);
    if (userEmail.value !== "") {
      useRouter().push("/home");
    } else {
      alert("メールもしくは、パスワードが違います。");
    }
  } catch (e) {
    alert("Errer: " + e);
  }
  isLoad.value = false;
};
</script>

<style scoped></style>
