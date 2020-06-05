import { Request, Response } from 'express';

import knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response){
    const items = await knex('items').select('*');
 
    const serializedItems = items.map(item => {
      return {
        name: item.title,
        image_url: `http://192.168.15.26:3333/uploads/${item.image}`,
        id: item.id
      }
    })

    return response.json(serializedItems);
  }

  async show(request: Request, response: Response){
    const id = request.params.id

    const item = await knex('items').where('id', id).first();

    if(!item) {
      return response.status(400).json({ message: "Not Found" });
    } else {
      return response.json(item);
    }

  }
}

export default ItemsController;
