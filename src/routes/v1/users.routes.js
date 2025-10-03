const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');

router.use((req, res, next) => {
  req.users = [
    {
      id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
      name: "Tatiana Vanegas",
      email: "tatiana@example.com",
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