///
/// user情報からのユーザー情報表示
///

import { useUsers } from "./store/store";

export const useUserName = () => {
  const users = useUsers();
  /// サイクル用
  const userInfo = (sanctuaryId: string) => {
    if (sanctuaryId) {
      const temp = users.value.filter(
        (val) => val.sanctuaryId === sanctuaryId
      )[0];
      return `${temp.firstName} ${temp.lastName}`;
    }
    return "";
  };

  const userId = (sanctuaryId: string) => {
    const temp = users.value.filter(
      (val) => val.sanctuaryId === sanctuaryId
    )[0];
    return `${temp.userId} : `;
  };

  const isVaildUser = (sanctuaryId: string) => {
    const temp = users.value.filter(
      (val) => val.sanctuaryId === sanctuaryId
    )[0];
    if (temp.isActive) {
      return true;
    } else {
      return false;
    }
  };

  /// 更新用
  const userUpdateInfo = (data: string) => {
    if (data) {
      const temp = users.value.filter((val) => val.sanctuaryId === data)[0];
      return `${temp.firstName} ${temp.lastName}`;
    }
    return "";
  };

  const userKana = (data: string) => {
    if (data) {
      const temp = users.value.filter((val) => val.sanctuaryId === data)[0];
      return `${temp.firstNameHira} ${temp.lastNameHira} `;
    }
    return "";
  };

  const userUpdateId = (data: string) => {
    if (data) {
      const temp = users.value.filter((val) => val.sanctuaryId === data)[0];
      return `${temp.userId}`;
    }
    return "";
  };

  return {
    userInfo,
    userId,
    isVaildUser,
    userUpdateInfo,
    userKana,
    userUpdateId,
  };
};
