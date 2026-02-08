const {
  getAllUsers: getAllUsersService,
} = require("../services/users.service");

exports.getAllUsers = (req, res) => {
  getAllUsersService().then((users) => {
    res.status(200).send({ users });
  });
};
