import * as consoleRepo from "../repository/consoleLog.repository.js";
import * as func from "../shared/function.js";

function createConsoleLog({ body }) {
  return new Promise((resolve, reject) => {
    try {
      let logBody = {
        project: body.project,
        module: body.module,
        server: body.server,
        serverType: body.serverType,
        method: body.serverType === "API" ? body.request.method : null,
        baseUrl: body.serverType === "API" ? body.request.host : body.socket.baseUrl,
        path: body.serverType === "API" ? body.request.url : body.socket.path,
        clientIp: body.serverType === "SOCKET" ? body.socket.clientIp : null,
        clientId: body.serverType === "SOCKET" ? body.socket.clientId : null,
        statusCode: body.statusCode ?? null,
        createdDate: new Date(),
        modifiedDate: new Date(),
        errorMessage: body.message ?? null,
        messageStack: body.stack ?? null,
        statusId: 1,
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

function getAllConsoleLog() {
  return new Promise((resolve, reject) => {
    try {
      consoleRepo
        .getConsole()
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

export { createConsoleLog, getAllConsoleLog };
