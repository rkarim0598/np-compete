const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addVotes = functions.firestore
	.document('donations/{donationId}')
	.onCreate((snap, context) => {
		const npid = snap.data().npid;
		if (!npid) return null;

		const npRef = db.doc(`nonprofits/${npid}`);
		npRef.get().then(doc => {
			if (doc.exists) {
				const votes = doc.get('votes') || 0;
				doc.ref.set({
					votes: votes + 1,
				}, { merge: true });
			} else {
				console.error(`NPID ${npid} not found`);
			}

			return null;
		}).catch(error => {
			console.error("Error getting document:", error);
		});

		return true;
	});

exports.test = functions.firestore
	.document('donations/{donationId}')
	.onCreate((snap, context) => {
		return snap.ref.set({
			authorized: true,
		}, { merge: true });
	});

exports.donate = require('./donate').donate;