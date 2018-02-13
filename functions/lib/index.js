"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require('firebase-admin');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);
exports.addUserMessages = functions.database.ref(`/messages/{messageId}`)
    .onWrite(event => {
    const messageKey = event.data.key;
    const messageValue = event.data.val();
    admin.database().ref(`/user-messages/${messageValue.userFromId}/${messageValue.userToId}`)
        .child(messageKey).set(1);
    admin.database().ref(`/user-messages/${messageValue.userToId}/${messageValue.userFromId}`)
        .child(messageKey).set(1);
    return true;
});
exports.generateLastMessage = functions.database.ref(`/messages/{messageId}`)
    .onWrite(event => {
    const messageKey = event.data.key;
    const messageValue = event.data.val();
    admin.database().ref(`/last-messages/${messageValue.userFromId}/${messageValue.userToId}`)
        .child('key').set(messageKey);
    admin.database().ref(`/last-messages/${messageValue.userToId}/${messageValue.userFromId}`)
        .child('key').set(messageKey);
    return true;
});
//# sourceMappingURL=index.js.map