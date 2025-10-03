const express = require('express');
const app = express();
const routes = require('./routes');
const { port } = require('./config/env')

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});