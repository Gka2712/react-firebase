import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey:"AIzaSyCWVQggzErgJd5SpsfaLVxgfs08Ee-hkoA",
  authDomain:"react-auth-fb2dc.firebaseapp.com",
  projectId:"react-auth-fb2dc",
  storageBucket:"react-auth-fb2dc.appspot.com",
  messagingSenderId:"905415073514",
  appId: "905415073514"
  };
const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
export {auth,db};