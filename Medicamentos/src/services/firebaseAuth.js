import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBeiQMg1FC-VRyqqqz-Yojx1mNaHUDZnNg",
  authDomain: "medicamentos-b0072.firebaseapp.com",
  databaseURL: "https://medicamentos-b0072.firebaseio.com",
  projectId: "medicamentos-b0072",
  storageBucket: "medicamentos-b0072.appspot.com",
  messagingSenderId: "4427513345",
  appId: "1:4427513345:web:59c38dca8ec86c83014a00",
  measurementId: "G-NXBQSFL23Z",
};

const firebaseService = firebase.initializeApp(firebaseConfig);

const fireBaseAuth = firebaseService.auth();

export default fireBaseAuth;
