const Contact = require("../models/contact");

exports.createContact = async (req, res, next) => {
  const email = req.body.email;
  const message = req.body.message;

  try {
    const contact = await Contact.create({
      email: email,
      message: message,
    });

    res
      .status(201)
      .json({ message: "Contact created succesfully!", contact: contact });
  } catch (error) {
    console.log(error);
  }
};
