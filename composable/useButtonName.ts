import type { ButtonName } from "~/types/allType";

/**
 * [メインボタン] の定数
 */

export const useMainButtonName = () => {
  const update: ButtonName = {
    name: "更新",
    path: "update",
  };

  const cycle: ButtonName = {
    name: "サイクル",
    path: "cycle",
  };

  const regist: ButtonName = {
    name: "新規登録",
    path: "regist",
  };

  const point: ButtonName = {
    name: "ポイント付与",
    path: "point",
  };

  const receipt: ButtonName = {
    name: "レシート",
    path: "receipt",
  };

  const users: ButtonName = {
    name: "会員照会",
    path: "users",
  };

  const categories = [update, cycle, regist, point, receipt, users];

  return {
    categories,
  };
};
