import { celebrate, Joi } from 'celebrate';
import express from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import ItemsController from './Controllers/ItemsController';
import PointsController from './Controllers/PointsController';

const routes = express();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/items/:id', itemsController.show);

routes.get('/points/:id', pointsController.show)
routes.get('/points/', pointsController.index)

routes.post(
	'/points',
	upload.single('image'),
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			whatsapp: Joi.number().required(),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
			city: Joi.string().required(),
			uf: Joi.string().required().max(2),
			items: Joi.string().required(),
		})
	}, {
		abortEarly: false
	}),
	pointsController.create)

export default routes;

/*{
	"name": "Mercado Exemplo",
	"whatsapp": "55 11 912345678",
	"email": "contato@MercadinhoDaEsquina",
	"latitude": -59.23643,
	"longitude": -49.6457,
	"city": "São Paulo",
	"uf": "SP",
	"items": [
		6
	]
}*/
