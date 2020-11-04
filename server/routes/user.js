const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserModel = require("../model/user.model");
const secret = "secretsShhh";
const withAuth = require("./middleware");

router.get("/", (req, res) => {
    res.send("user router");
});

router.post("/", async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = new UserModel({ name, password });
        user.save(err => {
            if (err) {
                res.status(500).send(err)
                // .send("Error registering new user please try again.");
            } else {
                res.status(200).send("Registration success!!!");
            }
        })
    } catch (error) {
        res.send(error);
    }
});

router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    try {
        await UserModel.findOne({ name }, (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else if (!user)
                res.status(401).send("User not found.")
            else {
                user.isCorrectPassword(password, (err, same) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    }
                    else if (!same)
                        res.status(401).send("Invalid User or password.")
                    else {
                        // issue token for auth.
                        const token = jwt.sign({ name }, secret, {
                            expiresIn: "1h"
                        });
                        res.cookie("token", token, { httpOnly: true }).sendStatus(200);
                    }
                })
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/logout", withAuth, (req, res) => {
    req.session.destroy(() => {
        console.log("sessions destroyed --");
    });
    res.clearCookie("token").send("success");
});

module.exports = router;