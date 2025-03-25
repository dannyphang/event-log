import * as exceptionRepo from "../repository/exceptionLog.repository.js";

function createExceptionLog({ body }) {
    return new Promise((resolve, reject) => {
        try {
            let logBody = {
                project: body.project,
                module: body.module,
                server: body.server,
                serverType: body.serverType,
                method: body.serverType === "API" ? body.request.method : null,
                baseUrl: body.serverType === "API" ? body.request.headers.host : body.socket.baseUrl,
                path: body.serverType === "API" ? body.request.url : body.socket.path,
                clientIp: body.serverType === "SOCKET" ? null : body.socket.clientIp,
                clientId: body.serverType === "SOCKET" ? null : body.socket.clientId,
                statusCode: body.statusCode ?? null,
                createdDate: new Date(),
                modifiedDate: new Date(),
                errorMessage: body.message ?? null,
                messageStack: body.stack ?? null,
                statusId: 1,
            };

            exceptionRepo
                .createException({ exception: logBody })
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

function getAllExceptionLog() {
    return new Promise((resolve, reject) => {
        try {
            exceptionRepo
                .getException()
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

export { createExceptionLog, getAllExceptionLog };
