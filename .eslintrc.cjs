// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    // Prettier を使用する場合
    "plugin:prettier/recommended",
  ],
  plugins: ["vue", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "vue/multi-word-component-names": "off", // シングルワードコンポーネント名を許可
    "no-console": "warn", // console の使用を警告
    indent: ["error", 2], // インデントを 2 スペースに設定
    // 他のカスタムルールをここに追加
  },
};
