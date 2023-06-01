import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA22EiKOd7ADvjSxng5yxl8yzk_gUdjYRU",
  authDomain: "whatsapp-clone-b73e9.firebaseapp.com",
  projectId: "whatsapp-clone-b73e9",
  storageBucket: "whatsapp-clone-b73e9.appspot.com",
  messagingSenderId: "1028890911493",
  appId: "1:1028890911493:web:250ada22ee0a7a08d10d6c"
};

const app = initializeApp(firebaseConfig);


export default function init()  {
  return app;
};