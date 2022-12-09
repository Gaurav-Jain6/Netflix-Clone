import {initializeApp} from "firebase/app" ;
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDLxrKRsF7aIGlaSbibZ01lPvwgPB8IALU",
    authDomain: "netflix-clone-b9ca7.firebaseapp.com",
    projectId: "netflix-clone-b9ca7",
    storageBucket: "netflix-clone-b9ca7.appspot.com",
    messagingSenderId: "469916759667",
    appId: "1:469916759667:web:2e35bcbd69505666f79c06",
    measurementId: "G-JREQ4L17WV"
};

let firebaseApp = initializeApp(firebaseConfig) ;
let firebaseAuth = getAuth(firebaseApp) ; 

export default firebaseAuth ;
