/**
 * サイクル画面の取得タイトル名、報酬額とポイント数
 */

/// R会員用
export const useRCyclePoint = () => {
  // タイトルのリスト
  const titles: string[] = [
    "直0",
    "直1",
    "直2",
    "直2 (CB)",
    "直3",
    "直3 (CB)",
    "3:3達成",
    "6:6達成",
    "12:12達成",
    "20:20達成",
    "40:40達成",
    "75:75達成",
    "150:150達成",
    "250:250達成",
    "375:375達成",
    "3:3到達",
    "6:6到達",
    "12:12到達",
    "20:20到達",
    "40:40到達",
    "75:75到達",
    "150:150到達",
    "250:250到達",
    "375:375到達",
  ];

  // ポイントのリスト
  const points: number[] = [
    0, 5000, 10000, 10000, 20000, 25000, 30000, 35000, 40000, 50000,
  ];

  // 報酬リスト (R会員)
  const rewardsR: number[] = [
    0, 20000, 44000, 66000, 110000, 220000, 363000, 660000, 990000, 1430000,
  ];

  // 報酬リスト (U会員 T会員 C会員 S会員)
  const rewardsOthers: number[] = [
    0, 20000, 21000, 25000, 35000, 50000, 55000, 75000, 100000, 130000, 275000,
    420000, 665000, 960000,
  ];

  const rewardType = (id: string) => {
    const rId = "r";
    if (id.charAt(0).toLowerCase() === rId) return rewardsR;

    return rewardsOthers;
  };

  return {
    titles,
    points,
    rewardsR,
    rewardType,
  };
};
