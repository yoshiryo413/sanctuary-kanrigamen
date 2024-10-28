import {onDocumentUpdated} from "firebase-functions/v2/firestore";

export const updateEmail = onDocumentUpdated("update/{userId}", (event) => {
  try {
    const newValue = event.data?.after.data();

    if (!newValue) {
      console.error("No data found in the updated document.");
      return;
    }

    const name = newValue.sanctuaryId;
    const list = newValue.updateList;

    console.log(`User ${name} has been updated. Name: ${list}`);

    // ここに追加のロジックを実装します。
    // 例: ユーザーのメールアドレスを更新する、通知を送信するなど。
  } catch (error) {
    console.error("Error in updateEmail function:", error);
  }
});
