const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});

app.get('/items', async (req, res) => {
    const items = await prisma.item.findMany({})

    res.json(items);
});

app.post('/items', async (req, res) => {
  const item = req.body;
  const{ item_id, name, refinement, price } = item;
  console.log('post item_id', item_id)
  const itemExists = await prisma.item.count({
    where: {
      item_id: parseInt(item_id, 10),
      refinement: parseInt(refinement, 10),
    }
  })

  if(itemExists){
    return res.status(500).json('O item já está na lista');
  }

  try {
    const createdItems = await prisma.item.create({
      data: { 
          item_id: parseInt(item_id, 10),
          name,
          refinement: parseInt(refinement, 10),
          price: parseInt(price, 10)
      },
    });

    res.json(createdItems);

  } catch (error) {
    console.error('Erro ao criar item:', error);
    return res.status(500).json('Erro ao criar item');
  }
});

app.put('/items', async (req, res) => {
    const itemsToUpdate = req.body;
  
    try {
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
      return res.status(500).json('Erro ao atualizar item');
    }
  });

  app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const item = await prisma.item.findUnique({
        where: { id: parseInt(id) }
      });

      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado.' });
      }

      await prisma.item.delete({
        where: { id: parseInt(id) }
      });

      res.status(200).json({ message: 'Item deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar item.' });
    }
})

const port = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(port, () => {
  console.log('Servidor rodando na porta '+port);
});