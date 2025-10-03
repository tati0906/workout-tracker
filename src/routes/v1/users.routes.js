const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');

router.use((req, res, next) => {
  req.users = [
    {
      id: "1",
      name: "tatiana vanegas",
      email: "tatiana@example.com",
      role: "admin",
      createdAt: "2025-09-12T12:00:00Z"
    },
    {
      id: "2",
      name: "Carlos navia",
      email: "carlos@example.com",
      role: "user",
      createdAt: "2025-09-12T12:00:00Z"
    }
  ];
  next();
});

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;