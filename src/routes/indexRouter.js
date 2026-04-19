import { Router } from 'express';
import { checkConnection, getGame } from '../model/queries.js';
import {
  getIndexController,
  postIndexController,
} from '../controller/indexController.js';

const indexRouter = Router();

indexRouter.get('/', getIndexController);
indexRouter.post('/', postIndexController);
indexRouter.get('/image/:id', async (req, res) => {
  const game = await getGame(req.params.id);
  res.set('Content-Type', 'image/png');
  res.send(game.cover_image);
});

export default indexRouter;
