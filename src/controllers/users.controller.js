const usersController = {
  // Obtener todos los usuarios (con filtros opcionales)
  getAllUsers: (req, res) => {
    const { role, search } = req.query;
    let result = req.users;

    if (role) {
      result = result.filter(u => u.role === role);
    }

    if (search) {
      result = result.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json(result);
  },

  // Obtener usuario por ID
  getUserById: (req, res) => {
    const { id } = req.params;
    const user = req.users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  },

  // Crear nuevo usuario
  createUser: (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name y email son requeridos' });
    }

    const newUser = {
      id: `${Date.now()}`,
      name,
      email,
      role: role || 'user',
      createdAt: new Date().toISOString()
    };

    req.users.push(newUser);
    res.status(201).json(newUser);
  },

  // Actualizar usuario
  updateUser: (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const index = req.users.findIndex(u => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!name || !email) {
      return res.status(400).json({ error: 'Name y email son requeridos' });
    }

    req.users[index] = {
      ...req.users[index],
      name,
      email,
      role
    };

    res.status(200).json(req.users[index]);
  },

  // Eliminar usuario
  deleteUser: (req, res) => {
    const { id } = req.params;
    const index = req.users.findIndex(u => u.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const deletedUser = req.users.splice(index, 1);
    res.status(200).json({ deleted: deletedUser[0].id });
  }
};
module.exports = usersController;