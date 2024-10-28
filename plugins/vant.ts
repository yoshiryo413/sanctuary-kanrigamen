import { defineNuxtPlugin } from "#app";
import Vant, { Locale } from "vant";

import "vant/lib/index.css";
import jaJP from "vant/es/locale/lang/ja-JP";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vant);
  Locale.use("ja-JP", jaJP);
});
