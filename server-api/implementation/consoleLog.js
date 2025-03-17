import * as consoleRepo from "../repository/consoleLog.repository.js";

function createConsoleLog({ logBody }) {
    return new Promise((resolve, reject) => {
        try {
            console.log(logBody);

            logBody.createdDate = new Date();
            logBody.modifiedDate = new Date();

            consoleRepo
                .createConsole({ logBody: logBody })
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
