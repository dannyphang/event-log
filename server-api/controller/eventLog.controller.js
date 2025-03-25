import { Router } from "express";
import express from "express";
const router = Router();
import * as func from "../shared/function.js";
import * as eventImp from "../implementation/eventLog.js";

router.use(express.json());

// create event
router.post("/", async (req, res) => {
    try {
        eventImp
            .createEventLog({
                body: JSON.parse(JSON.stringify(func.body(req).data.eventDetail)),
            })
            .then((data) => {
                res.status(200).json(func.responseModel({ data: data }));
            })
            .catch((error) => {
                console.log("error", error);
                res.status(500).json(
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

// get log
router.get("/", async (req, res) => {
    try {
        eventImp
            .getAllEventLog()
            .then((data) => {
                res.status(200).json(func.responseModel({ data: data }));
            })
            .catch((error) => {
                console.log("error", error);
                res.status(500).json(
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
