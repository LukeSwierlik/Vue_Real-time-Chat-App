import firebase from 'firebase';

const config = {
    // Config firebase
};

const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({
    timestampsInSnapshots: true
});

export default firebaseApp.firestore();