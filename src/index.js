const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/items', async (req, res) => {
    const items = await prisma.item.findMany({})

    res.json(items);
});

// Rota para atualizar os itens
app.put('/items', async (req, res) => {
    console.log('put items')
    const itemsToUpdate = req.body;
  
    if (!Array.isArray(itemsToUpdate)) {
      return res.status(400).json({ error: 'A requisição deve ser um array de itens' });
    }
    console.log('itemsToUpdate', itemsToUpdate)
  
    try {
      // Atualize cada item na base de dados
      const updatedItems = await Promise.all(
        itemsToUpdate.map(async (item) => {
          const { id, refinement, price } = item;

          console.log('item', item)

          return await prisma.item.update({
            where: { id },
            data: { 
                refinement,
                price: parseInt(price, 10)
            },
          });
        })
      );
  
      res.json(updatedItems);
    } catch (error) {
      console.error('Erro ao atualizar itens:', error);
      res.status(500).json({ error: 'Erro ao atualizar itens' });
    }
  });

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});