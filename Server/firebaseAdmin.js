import admin from 'firebase-admin';
import serviceAccount from './path-to-service-account-file.json'; // Adjust the path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://smarthotel-a2786-default-rtdb.firebaseio.com'
});

export default admin;
