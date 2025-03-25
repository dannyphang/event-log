import * as firebase from "../configuration/firebase-admin.js";
import { Filter } from "firebase-admin/firestore";

const exceptionCollection = "exception";

function createException({ exception }) {
    return new Promise(async (resolve, reject) => {
        try {
            let newRef = firebase.db.collection(exceptionCollection).doc();
            exception.uid = newRef.id;
            await newRef.set(exception);
            resolve(exception);
        } catch (error) {
            reject(error);
        }
    });
}

function getException() {
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await firebase.db.collection(exceptionCollection).orderBy("modifiedDate", "desc").orderBy("createdDate", "desc").where("statusId", "==", 1).get();

            const list = snapshot.docs.map((doc) => doc.data());
            resolve(list);
        } catch (error) {
            reject(error);
        }
    });
}

export { createException, getException };
