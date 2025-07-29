// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7JU2HJpEZFW4LSFH0LzRVivulTUgaBpc",
  authDomain: "mgprofilbox.firebaseapp.com",
  projectId: "mgprofilbox",
  storageBucket: "mgprofilbox.appspot.com",
  messagingSenderId: "663481645724",
  appId: "1:663481645724:web:f438035583a728200e0b59",
  measurementId: "G-C20NJDMSRE"
};

// Initialize Firebase using the compatibility libraries
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
