import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const items = [
  { item_id: 6608, name: 'Mana coagulada', price: 5, refinement: null },
  { item_id: 27361, name: 'Contaminated Wanderer Card', price: 2500, refinement: null },
  { item_id: 400368, name: 'Adorno de 20º Aniversário [1]', price: 15000, refinement: null },
  { item_id: 840005, name: 'Scrap Bomber [2]', price: 1500, refinement: null },
  { item_id: 400177, name: 'Elmo de Fafnir [1]', price: 20000, refinement: null },
  { item_id: 420110, name: 'Cachecol Camuflado Antigo', price: 70000, refinement: null },
  { item_id: 28502, name: 'Lenço Infame', price: 5000, refinement: null },
  { item_id: 450176, name: 'Jetpack Robusta [1]', price: 15000, refinement: null },
  { item_id: 400213, name: 'Faith Of Yggdrasil [1]', price: 15000, refinement: null },
  { item_id: 410176, name: 'Fones de Ouvido da Bruxa', price: 20000, refinement: null },
  { item_id: 420006, name: 'Coleira de Espinhos', price: 9999, refinement: null },
  { item_id: 460097, name: 'Grace Tiger Suit JRO [1]', price: 12000, refinement: null },
  { item_id: 4624, name: 'Carta Tao Gunka Selada', price: 50000, refinement: null },
  { item_id: 9301, name: 'Ovo de Fulgor', price: 15000, refinement: null },
  { item_id: 20908, name: 'Manto da Bruxa [1]', price: 6000, refinement: null },
  { item_id: 540056, name: 'Dim Glacier Book [1]', price: 100000, refinement: null },
  { item_id: 530034, name: 'Dim Glacier Spear [1]', price: 100000, refinement: null },
  { item_id: 470047, name: '[MEGA] Patas de Raposas [1]', price: 35000, refinement: null },
  { item_id: 28962, name: 'Escudo Divino', price: 100000, refinement: null },
  { item_id: 490207, name: 'Memento Mori [1]', price: 100000, refinement: null },
  { item_id: 420110, name: 'Cachecol Camuflado Antigo', price: 80000, refinement: null },
  { item_id: 460023, name: 'Escudo da Fênix [1]', price: 100000, refinement: null },
  { item_id: 590047, name: 'Dim Glacier Mace [1]', price: 100000, refinement: null },
  { item_id: 9288, name: 'Ovo de Dragão da Serenidade', price: 250000, refinement: null },
  { item_id: 4357, name: 'Carta Lorde Seyren', price: 100000, refinement: null },
]

async function main() {
  console.log('Iniciando a inserção de itens...')

  for (const item of items) {
    await prisma.item.create({
      data: {
        item_id: parseInt(item.item_id),
        name: item.name,
        price: parseInt(item.price),
        refinement: item.refinement ? parseInt(item.refinement) : null,
      },
    });
  }

  console.log('Itens inseridos com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
