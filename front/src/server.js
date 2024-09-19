const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const filePath = path.join(__dirname, 'API', 'db.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer la base de datos' });
    }
    
    const db = JSON.parse(data);
    const user = db.users.find(user => user.id === userId);
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
