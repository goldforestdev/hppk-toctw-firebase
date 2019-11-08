const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
admin.initializeApp();

exports.myFunction = functions.firestore
  .document('notice/{noticeId}')
  .onCreate((snap, context) => { 
  
	const newValue = snap.data();
	const noticeTitle = newValue.title;
	const noticeBody = newValue.body;
  
    console.log('notice title:', noticeTitle, ': body :', noticeBody);
  
    // Notification details.
    const payload = {
		notification: {
            title: noticeTitle,
            body: noticeBody
        }
    };
  
	return admin.messaging().sendToTopic("latest_notice", payload);  
  
  });