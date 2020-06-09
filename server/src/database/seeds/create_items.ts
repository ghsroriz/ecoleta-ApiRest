import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: "Lâmpadas", image: 'http://localhost:3333/uploads/lampadas.svg' },
        { title: "Pilhas e baterias", image: 'http://localhost:3333/uploads/baterias.svg' },
        { title: "Papeis e Papelão", image: 'http://localhost:3333/uploads/papeis-papelao.svg' },
        { title: 'Resíduos Eletrônicos', image: 'http://localhost:3333/uploads/eletronicos.svg' },
        { title: "Resíduos Orgânicos", image: 'http://localhost:3333/uploads/organicos.svg' },
        { title: "Óleo de cozinha", image: 'http://localhost:3333/uploads/oleo.svg' }
    ]);
}