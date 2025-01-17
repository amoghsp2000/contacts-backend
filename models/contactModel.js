const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: "User" 
    },
    name: {
        type: String,
        required: [true, "Please Add The Contact Name"]
    },
    email: {
        type: String,
        required: [true, "Please Add The Contact Email Address"]
    },
    phone: {
        type: String,
        required: [true, "Please Add The Contact Phone Number"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);