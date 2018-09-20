import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDSGuZlDuA2RGrinhAHMzQuqBmeVqyi3HE",
    authDomain: "ninja-real-time-chat-app.firebaseapp.com",
    databaseURL: "https://ninja-real-time-chat-app.firebaseio.com",
    projectId: "ninja-real-time-chat-app",
    storageBucket: "",
    messagingSenderId: "168957292481"
};

const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({
    timestampsInSnapshots: true
});

export default firebaseApp.firestore();