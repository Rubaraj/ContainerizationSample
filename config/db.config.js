// import firebase from 'firebase'
import * as config from './config.js'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// const db = firebase.initializeApp(config.default.firebaseConfig)

// export {db}+
// import serviceAccount from './path/to/serviceAccountKey.json' assert {type: 'json'};
firebase.initializeApp(config.default.firebaseConfig);

// Use these for db & auth
const db = firebase.firestore();

export default db;


