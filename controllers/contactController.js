const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all Contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({
        user_id: req.user.id
    });
    res.status(200).json(contacts);
});

//@desc Create new Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        phone
    } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    };

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json(contact);
});

//@desc Get individual Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact)
});



//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Dont Have Permission To Update Other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        }
    );

    res.status(200).json(updatedContact);
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User Dont Have Permission To Delete Other user contacts");
    }

    await Contact.deleteOne(contact._id);

    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}