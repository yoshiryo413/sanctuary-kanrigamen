import dayjs from "dayjs";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  getFirestore,
  collection,
  updateDoc,
  doc,
  getDocs,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";

import { useDayConvert } from "./useDayConvert";
import { usePoint, useUserEmail } from "~/composable/store/store";
import type { Cycle, DispCycle, Point, Update, User } from "~/types/allType";

export const useFirebase = () => {
  const db = getFirestore();
  const points = usePoint();
  const dayConvert = useDayConvert();

  //コレクション共通
  const getCollection = async (name: string) => {
    const userRef = collection(db, `${name}`);
    const snapshot = await getDocs(userRef);
    return snapshot;
  };

  //ログイン用
  const useAuth = async (email: string, password: string) => {
    const auth = getAuth();
    const userEmail = useUserEmail();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userEmail.value = userCredential.user.email || "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //　user情報取得
  const getUser = async () => {
    const snapshot = await getCollection("user");
    const users = snapshot.docs.map((doc) => {
      const temp = doc.data() as User;
      temp.documentId = doc.id;
      return temp;
    });
    return users;
  };

  //　update情報取得
  const getUpdate = async () => {
    const snapshot = await getCollection("update");
    const updates = snapshot.docs.map((doc) => {
      const temp = doc.data() as Update;
      temp.documentId = doc.id;
      return temp;
    });
    return updates;
  };

  //　cycle情報取得
  const getCycle = async () => {
    const snapshot = await getCollection("cycle");
    const cycles = snapshot.docs.map((doc) => {
      const temp = doc.data() as Cycle;
      temp.documentId = doc.id;
      return temp;
    });
    return cycles;
  };

  //　point情報取得
  const getPoint = async () => {
    const snapshot = await getCollection("point");
    const points = snapshot.docs.map((doc) => {
      const temp = doc.data() as Point;
      temp.documentId = doc.id;
      return temp;
    });
    return points;
  };

  //　update情報更新
  const updateUser = async (list: Update[], receiving: string) => {
    if (list.length !== 0) {
      for (const update of list) {
        const tempday = dayjs(update.expiredDay);
        const end = tempday.add(28, "day");

        const updated = {
          startDay: update.expiredDay,
          endDay: end.format("YYYY/MM/DD"),
          receiving,
        };

        const docRef = doc(collection(db, "update"), update.documentId);
        await updateDoc(docRef, {
          updateTimeStamp: Timestamp.now(),
          expiredDay: end.format("YYYY/MM/DD"),
          updateList: arrayUnion(updated),
        });
      }
    }
  };

  //　未更新者
  const notUpdateUser = async (list: Update[], users: User[]) => {
    if (list.length !== 0 && users.length !== 0) {
      for (const update of list) {
        const temp = users.filter(
          (val) => val.sanctuaryId === update.sanctuaryId
        )[0];

        const docRef = doc(collection(db, "user"), temp.documentId);
        await updateDoc(docRef, { isActive: false });
      }
    }
  };

  //　サイクル情報更新
  const updateCycle = async (list: DispCycle[]) => {
    if (list.length !== 0) {
      for (const cycle of list) {
        const docRef = doc(collection(db, "cycle"), cycle.documentId);

        console.log(
          `${cycle.nextTitle} + ${cycle.getPoint} + ${cycle.getReward}`
        );

        if (cycle.nextTitle === "") {
          return;
        } else {
          const cycleList = {
            startCycle: cycle.startCycle,
            endCycle: cycle.endCycle,
            reward: cycle.getReward,
            title: cycle.nextTitle,
            memo: "",
            detail: "",
            confirme: false,
          };

          await updateDoc(docRef, {
            updateTimeStamp: Timestamp.now(),
            recentEndCycle: cycle.endCycle,
            recentTitle: cycle.nextTitle,
            cycleList: arrayUnion(cycleList),
          });
        }
      }
    }
  };

  //　ポイント付与
  const addPoint = async (list: DispCycle[]) => {
    if (list.length !== 0) {
      for (const point of list) {
        const pointList = {
          validDay: dayConvert.expireDay(point.startCycle),
          point: point.getPoint,
          memo: "",
          title: point.nextTitle,
          startDay: dayConvert.isValid(point.startCycle),
        };

        const pointUser = points.value.filter(
          (val) => val.sanctuaryId === point.sanctuaryId
        )[0];
        const docRef = doc(collection(db, "point"), pointUser.documentId);

        await updateDoc(docRef, {
          updateTimeStamp: Timestamp.now(),
          pointTotal: point.getPoint + pointUser.pointTotal,
          pointList: arrayUnion(pointList),
        });
      }
    }
  };

  return {
    useAuth,
    getUser,
    getUpdate,
    getCycle,
    getPoint,
    updateUser,
    notUpdateUser,
    updateCycle,
    addPoint,
  };
};
