const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();
const creds = require('./creds');
const stripe = require('stripe')(creds.stripe);
const FieldValue = admin.firestore.FieldValue;

exports.donate = functions.https.onRequest(async (req, res) => {
    try {
        const body = req.body;

        let data = {
            amount: parseFloat(body.amount),
            authorized: 'false',
            np: db.collection('nonprofits').doc(body.npid),
            email: body.email
        };
        if(body.anonymous === 'true') {
            data = {
                ...data,
                anonymous: true
            };
        } else {
            data = {
                ...data,
                anonymous: false,
                name: body.name,
            };
        }
        
        console.log(data);

        const docPromise = db.collection('donations').add(data);

        const toCharge = {
            amount: 100*parseFloat(body.amount),
            currency: 'usd',
            description: 'Donation to ' + body.np,
            source: body.stripeToken,
            receipt_email: body.email,
            timestamp: FieldValue.serverTimestamp()
        };

        console.log(toCharge);

        const chargePromise = stripe.charges.create(toCharge);
        
        const [doc, charge] = await Promise.all([docPromise, chargePromise])

        doc.update({
            stripeId: charge.id,
            authorized: charge.paid,
            timestamp: FieldValue.serverTimestamp()
        });

        console.debug(charge);
    } catch (e) {
        console.error(e);
    }
    
    res.redirect("http://localhost:8080");
});
