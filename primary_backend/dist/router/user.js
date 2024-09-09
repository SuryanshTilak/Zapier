"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => {
    res.send('hi');
    console.log("Signup handler");
});
router.post('/signin', (req, res) => {
    console.log("signin handler");
});
router.get("/user", middleware_1.authMiddleware, (req, res) => {
    res.send("hi");
    console.log("signup handler");
});
exports.userRouter = router;
