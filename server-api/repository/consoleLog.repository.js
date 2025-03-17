import * as firebase from "../configuration/firebase-admin.js";
import { Filter } from "firebase-admin/firestore";

const consoleCollection = "console";

function createConsole({ console }) {
    return new Promise(async (resolve, reject) => {
        try {
            let newRef = firebase.db.collection(consoleCollection).doc();
            console.uid = newRef.id;
            await newRef.set(console);
            resolve(console);
        } catch (error) {
            reject(error);
        }
    });
}

export { createConsole };
