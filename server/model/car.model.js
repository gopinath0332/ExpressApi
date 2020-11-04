const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manufacture: {
        type: String
    },
    availability: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Car", carSchema);