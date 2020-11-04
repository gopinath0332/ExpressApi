const express = require("express");
const router = express.Router();
const carModel = require("../model/car.model");

const withAuth = require("./middleware");

/*router.get("/", (req, res) => {
    const data = carModel.find((err, doc)=>{
        if (err) 
            res.send(err);
        else 
        res.render("cars", {cars: doc});
    });
    // res.render("cars", {cars: data});
})*/
router.use(withAuth);

router.get("/", async (req, res) => {
    const data = await carModel.find();
    console.log(req.session.views);
    res.json(data);
});

router.post("/", async (req, res) => {
    const car = new carModel({
        name: req.body.name,
        manufacture: req.body.manufacture
    });
    try {
        const data = await car.save();
        res.json(data);
    } catch (error) {
        res.send(error);
    }
});

router.get("/:name", async (req, res) => {
    const data = await carModel.find({
        "name": `${req.params.name}`
    });
    res.json(data);
});



module.exports = router;