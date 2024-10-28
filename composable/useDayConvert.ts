/**
 * サイクル画面の取得タイトル名、報酬額とポイント数
 */

import dayjs from "dayjs";

/// R会員用
export const useDayConvert = () => {
  /// フォーマット
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  /// サイクル用
  const cycleStart = (data: string) => {
    if (data) {
      const date = dayjs(data);
      const twentyEightDaysAgo = date.subtract(31, "day");
      return twentyEightDaysAgo.format("YYYY/MM/DD");
    }
    return "";
  };

  const cycleEnd = (data: string) => {
    if (data) {
      const date = dayjs(data);
      const twentyEightDaysAgo = date.add(30, "day");
      return twentyEightDaysAgo.format("YYYY/MM/DD");
    }
    return "";
  };

  const addOneday = (data: string) => {
    if (data) {
      const date = dayjs(data);
      const twentyEightDaysAgo = date.add(1, "day");
      return twentyEightDaysAgo.format("YYYY/MM/DD");
    }
    return "";
  };

  ///
  /// 更新用
  ///
  const updateStart = (data: string) => {
    if (data) {
      const date = dayjs(data);
      const twentyEightDaysAgo = date.subtract(28, "day");
      return twentyEightDaysAgo.format("YYYY/MM/DD");
    }
    return "";
  };

  const checkExpired = (data: string) => {
    const today = dayjs().format("YYYY/MM/DD");
    const expired = dayjs(data).format("YYYY/MM/DD");
    if (today === expired) {
      return "期日";
    } else if (today > expired) {
      return "未更新";
    } else {
      return "";
    }
  };

  /// ポイントの有効期限用
  const expireDay = (data: string) => {
    if (data) {
      const date = dayjs(data);
      const twentyEightDaysAgo = date.add(88, "day");
      return twentyEightDaysAgo.format("YYYY/MM/DD");
    }
    return "";
  };

  /// ポイントの利用開始可能日
  const isValid = (data: string) => {
    if (data) {
      const date = dayjs(data);
      const twentyEightDaysAgo = date.add(27, "day");
      return twentyEightDaysAgo.format("YYYY/MM/DD");
    }
    return "";
  };

  return {
    formatDate,
    cycleStart,
    cycleEnd,
    addOneday,
    updateStart,
    checkExpired,
    expireDay,
    isValid,
  };
};
