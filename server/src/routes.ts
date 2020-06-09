import express from 'express';
import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';

/**
 * This is the main file that defines all the routes used by this API.
 */

const routes = express.Router();
const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/items', itemsController.index);
routes.get('/points/:id',pointsController.show);
routes.get('/points',pointsController.index)
routes.post('/points', pointsController.create);

export default routes;