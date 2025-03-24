import { Router } from "express";
import express from "express";
const router = Router();
import * as func from "../shared/function.js";
import * as consoleImp from "../implementation/consoleLog.js";
import { log } from "console";

router.use(express.json());

// create log
router.post("/", async (req, res) => {
    try {
        consoleImp
            .createConsoleLog({
                body: JSON.parse(JSON.stringify(func.body(req).data.errorDetails)),
            })
            .then((data) => {
                res.status(200).json(func.responseModel({ data: data }));
            })
            .catch((error) => {
                console.log("error", error);
                func.responseModel({
                    isSuccess: false,
                    responseMessage: error,
                });
            });
    } catch (error) {
        console.log("error", error);
        func.responseModel({
            isSuccess: false,
            responseMessage: error,
        });
    }
});

export default router;
