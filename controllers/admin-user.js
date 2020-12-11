const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found!" });
      }
      res.status(200).json({ user: user });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;

  User.create({
    name: name,
    email: email,
  })
    .then((user) => {
      res
        .status(201)
        .json({ message: "User created succesfully!", user: user });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const name = req.body.name;
  const email = req.body.email;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found!" });
      }
      user.name = name;
      user.email = email;
      return user.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "User updated succesfully", user: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found!" });
      }
      return user.destroy();
    })
    .then((result) => {
      res.status(200).json({ message: "User deleted succesfully!" });
    })
    .catch((err) => {
      console.log(err);
    });
};
