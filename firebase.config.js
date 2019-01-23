import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Initialize Firebase
export const config = {
  apiKey: 'AIzaSyBL40t5YuZ6Li3xM1k_m0Qo6mVpNFtXjro',
  authDomain: 'kadmi-website-be1cc.firebaseapp.com',
  databaseURL: 'https://kadmi-website-be1cc.firebaseio.com',
  projectId: 'kadmi-website-be1cc',
  storageBucket: 'kadmi-website-be1cc.appspot.com',
  messagingSenderId: '428070253337'
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
