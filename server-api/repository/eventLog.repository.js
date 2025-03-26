import * as firebase from "../configuration/firebase-admin.js";
import { Filter } from "firebase-admin/firestore";

const eventCollection = "event";

function createEvent({ event }) {
    return new Promise(async (resolve, reject) => {
        try {
            let newRef = firebase.db.collection(eventCollection).doc();
            event.uid = newRef.id;
            await newRef.set(event);
            resolve(event);
        } catch (error) {
            reject(error);
        }
    });
}

function getEvent() {
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await firebase.db.collection(eventCollection).orderBy("modifiedDate", "desc").orderBy("createdDate", "desc").where("statusId", "==", 1).get();

            const list = snapshot.docs.map((doc) => doc.data());
            resolve(list);
        } catch (error) {
            reject(error);
        }
    });
}

function searchEvent({ params }) {
    return new Promise(async (resolve, reject) => {
        try {
            let query = firebase.db.collection(eventCollection);

            // Apply dynamic where conditions
            Object.entries(params).forEach(([key, value]) => {
                query = query.where(key, "==", value);
            });
            const snapshot = await query.get();
            const list = snapshot.docs.map((doc) => doc.data());

            resolve(list);
        } catch (error) {
            reject(error);
        }
    });
}

export { createEvent, getEvent, searchEvent };
