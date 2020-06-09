import {Request, Response} from 'express';
import knex from "../database/connection";

/**
 * This is the Items controller.
 *
 * You can se what it is about on the README.md
 */

class ItemsController{
    async index(request:Request, response:Response) {
        const items = await knex('items').select('*');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            }
        });
        return response.json(items);
    }
}
export default ItemsController;