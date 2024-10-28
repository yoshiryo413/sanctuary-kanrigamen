import type { Cycle, Point, Update, User } from "~/types/allType";

// 管理者のメール保持用
export const useUserEmail = (): globalThis.Ref<string> =>
  useState<string>("userEmail", () => ref(""));

// 会員保持用
export const useUsers = (): globalThis.Ref<User[]> =>
  useState<User[]>("useUsers", () => ref([]));

// 会員更新保持用
export const useUpdate = (): globalThis.Ref<Update[]> =>
  useState<Update[]>("useUpdate", () => ref([]));

// 会員サイクル保持用
export const useCycle = (): globalThis.Ref<Cycle[]> =>
  useState<Cycle[]>("useCycle", () => ref([]));

// 会員ポイント保持用
export const usePoint = (): globalThis.Ref<Point[]> =>
  useState<Point[]>("usePoint", () => ref([]));
