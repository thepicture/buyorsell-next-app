import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  connectAuthEmulator,
  debugErrorMap,
  indexedDBLocalPersistence,
  initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  errorMap: debugErrorMap,
  persistence: indexedDBLocalPersistence,
});
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, process.env.NEXT_PUBLIC_LOCALHOST!);
}
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { app, auth, analytics };
