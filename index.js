/*
 * Background Cloud Function to be triggered by Pub/Sub. 
 * This function is exported by index.js, and executed when 
 * the trigger topic receives a message. 
 * 
 * @param {object} data - The event payload.
 * @param {object} context - The event metadata. 
 * */

var functions = require('firebase-functions');
var admin = require('firebase-admin');

const db = admin.database();

// Load service account key
var serviceAccount = require('./credentials/watchmen-mqtt-7a0423b22e.json');

// [START function_pubsub_setup]
const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub(); // Instantiate a client
// [END function_pubsub_setup]

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://watchmen-mqtt.firebaseio.com"
});

// [START functions_pubsub_subscribe]
/*
 * Triggered from a message on a Cloud Pub/Sub topic.
 * 
 * @param {object} pubsubMessage - The Cloud Pub/Sub Message object. 
 * @param {object} pubsubMessage.data - The "data" property of the Cloud Pub/Sub Message. 
 * */
exports.tmonpiCloudFunction = (data, context) => {
    // Print out the data from Pub/Sub
    const pubsubMessage = data;
    const name = pubsubMessage.data;
    console.log(Buffer.from(pubsubMessage.data, 'base64').toString());

    const message = {
        name: "test", 
        version: "1.1.1"
    };

    return Promise.all([
        updateFirebase(message)
    ]);
};
// [END functions_pubsub_subscribe]

function updateFirebase(message) {
return db.ref(`/devices/${message.name}`).set({
    version: message.version
});
};