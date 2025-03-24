import * as consoleRepo from "../repository/consoleLog.repository.js";

function createConsoleLog({ body }) {
    return new Promise((resolve, reject) => {
        try {
            let logBody = {
                method: body.request.method,
                baseUrl: body.request.headers.host,
                path: body.request.url,
                statusCode: body.statusCode ?? null,
                createdDate: new Date(),
                modifiedDate: new Date(),
                errorMessage: body.message,
                messageStack: body.stack,
            };

            consoleRepo
                .createConsole({ console: logBody })
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

export { createConsoleLog };
