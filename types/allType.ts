import type { Timestamp } from "firebase/firestore";

// 共通ボタンのタイプ
export type ButtonName = {
  name: string;
  path: string;
};

// User
export type User = {
  documentId: string;
  lastName: string;
  firstName: string;
  sanctuaryId: string;
  userId: string;
  lastNameHira: string;
  firstNameHira: string;
  registDay: string;
  introducer: string;
  isActive: boolean;
  birthday: string;
  bank: string;
  branch: string;
  type: string;
  accountNum: string;
  postCode: string;
  address: string;
  phoneNum: string;
  mail: string;
};

// CycleList
export type CycleList = {
  startCycle: string;
  endCycle: string;
  reward: number;
  title: string;
  memo: string;
  detail: string;
  confirme: boolean;
};

// Cycle
export type Cycle = {
  documentId: string;
  sanctuaryId: string;
  creatreTimeStamp: Timestamp;
  updateTimeStamp: Timestamp;
  recentTitle: string;
  recentEndCycle: string;
  isDeliver: boolean;
  cycleList: CycleList[];
};

// DispCycleサイクル表示用オブジェクト
export type DispCycle = {
  documentId: string;
  sanctuaryId: string;
  user: string;
  id: string;
  recentTitle: string;
  recentEndCycle: string;
  nextTitle: string;
  getReward: number;
  getPoint: number;
  endCycle: string;
  startCycle: string;
  isDeliver: boolean;
};

// UpdateList
export type UpdateList = {
  startDay: string;
  endDay: string;
  receiving: string;
};

// Update
export type Update = {
  documentId: string;
  sanctuaryId: string;
  creatreTimeStamp: Timestamp;
  updateTimeStamp: Timestamp;
  expiredDay: string;
  autoUpdate: boolean;
  isDeliver: boolean;
  updateList: UpdateList[];
};

// DispUpdate更新表示用オブジェクト
export type DispUpdate = {
  documentId: string;
  sanctuaryId: string;
  user: string;
  expiredDay: string;
  autoUpdate: boolean;
  isDeliver: boolean;
  updateList: UpdateList[];
};

// PointList
export type PointList = {
  validDay: string;
  point: number;
  memo: string;
  title: string;
  startDayy: string;
};

// point
export type Point = {
  documentId: string;
  sanctuaryId: string;
  creatreTimeStamp: Timestamp;
  updateTimeStamp: Timestamp;
  pointTotal: number;
  pointList: PointList[];
};
