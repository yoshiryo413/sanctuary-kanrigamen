import * as admin from "firebase-admin";
import { updateEmail } from "./email/update";
import { cycleEmail } from "./email/cycle";

// Firebase Admin の初期化
admin.initializeApp();

// 関数のエクスポート
export { updateEmail, cycleEmail };

// デプロイ手順
//  npx eslint . --fix
// cd function
// firebase deploy --only functions:updateEmail,functions:cycleEmail
