import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3Qq6d_HVMETfbLIzsUSwYn5PGTO9xark",
  authDomain: "learnwithme-b8c40.firebaseapp.com",
  projectId: "learnwithme-b8c40",
  storageBucket: "learnwithme-b8c40.appspot.com",
  messagingSenderId: "1053561415707",
  appId: "1:1053561415707:web:f8b5ff9e875bc8c668f0be",
  measurementId: "G-VZB0W37SNS"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
