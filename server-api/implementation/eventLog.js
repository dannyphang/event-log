import * as eventRepo from "../repository/eventLog.repository.js";
import * as func from "../shared/function.js";

function createEventLog({ body }) {
    return new Promise((resolve, reject) => {
        try {
            let logBody = {
                description: body.description,
                module: body.module,
                eventName: body.eventName,
                browser: body.browser || null,
                browserVersion: body.browserVersion || null,
                appPlatform: body.appPlatform || null,
                clientIP: body.clientIP || null,
                clientPort: body.clientPort || null,
                clientLatitude: body.clientLatitude || null,
                clientLongtitude: body.clientLongtitude || null,
                mobileModel: body.mobileModel || null,
                mobileOSVersion: body.mobileOSVersion || null,
                createdDate: new Date(),
                createdBy: body.createdBy || null,
                modifiedDate: new Date(),
                modifiedBy: body.modifiedBy || null,
                statusId: 1,
            };

            eventRepo
                .createEvent({ event: logBody })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (error) {
            reject(error);
        }
    });
}

function getAllEventLog() {
    return new Promise((resolve, reject) => {
        try {
            eventRepo
                .getEvent()
                .then(async (list) => {
                    await Promise.all(
                        list.map(async (data) => {
                            data.createdDate = func.convertFirebaseDateFormat(data.createdDate);
                            data.modifiedDate = func.convertFirebaseDateFormat(data.modifiedDate);
                        })
                    );
                    resolve(list);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (error) {
            reject(error);
        }
    });
}

export { createEventLog, getAllEventLog };
