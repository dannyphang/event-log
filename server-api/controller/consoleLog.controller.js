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
        if (func.body(req).data.errorDetails) {
            consoleImp
                .createConsoleLog({
                    body: JSON.parse(JSON.stringify(func.body(req).data.errorDetails)),
                })
                .then((data) => {
                    res.status(200).json(func.responseModel({ data: data }));
                })
                .catch((error) => {
                    console.log("error", error);
                    res.status(400).json(
                        func.responseModel({
                            isSuccess: false,
                            responseMessage: error,
                        })
                    );
                });
        } else {
            res.status(500).json(
                func.responseModel({
                    isSuccess: false,
                    responseMessage: "Empty body",
                })
            );
        }
    } catch (error) {
        console.log("error", error);
        func.responseModel({
            isSuccess: false,
            responseMessage: error,
        });
    }
});

// get log
router.get("/", async (req, res) => {
    try {
        consoleImp
            .getAllConsoleLog()
            .then((data) => {
                res.status(200).json(func.responseModel({ data: data }));
            })
            .catch((error) => {
                console.log("error", error);
                res.status(400).json(
                    func.responseModel({
                        isSuccess: false,
                        responseMessage: error,
                    })
                );
            });
    } catch (error) {
        console.log("error", error);
        res.status(500).json(
            func.responseModel({
                isSuccess: false,
                responseMessage: error,
            })
        );
    }
});

export default router;
