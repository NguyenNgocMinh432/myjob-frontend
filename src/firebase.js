import firebase from "firebase";
import "firebase/storage"
const config = {
    apiKey: "AIzaSyCB3qsovZ18tPkKX7IS1_SKbyc2Mm3ikgQ",
    authDomain: "my-jobs-dfad3.firebaseapp.com",
    projectId: "my-jobs-dfad3",
    storageBucket: "my-jobs-dfad3.appspot.com",
    messagingSenderId: "331868091369",
    appId: "1:331868091369:web:284aec709b14d0d17cd178"
};

firebase.initializeApp(config)

const storage = firebase.storage()
export { storage, firebase as default }