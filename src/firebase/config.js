import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBPfj3N7aqkzkwzMLIVSujj7lkTS48qE60",
  authDomain: "olx-clone-bf0cc.firebaseapp.com",
  projectId: "olx-clone-bf0cc",
  storageBucket: "olx-clone-bf0cc.appspot.com",
  messagingSenderId: "37271799886",
  appId: "1:37271799886:web:9f60405022ccff248a9b1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
