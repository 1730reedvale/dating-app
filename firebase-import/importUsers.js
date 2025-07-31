const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin with your service account
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load user profiles from JSON file
const users = JSON.parse(fs.readFileSync('./demo_dating_profiles.json', 'utf8'));

// Upload each user
(async () => {
  const batch = db.batch();

  users.forEach((user) => {
    const ref = db.collection('users').doc(user.uid);
    batch.set(ref, user);
  });

  await batch.commit();
  console.log('✅ Users imported successfully!');
})();
