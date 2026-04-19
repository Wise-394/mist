import { Router } from 'express';
import multer from 'multer';
import {
  deleteGameController,
  getGameController,
  postGameController,
} from '../controller/gameController.js';

const upload = multer({ storage: multer.memoryStorage() });

const gameRouter = Router();

gameRouter.get('/:id', getGameController);
gameRouter.post('/:id', upload.single('image'), postGameController);
gameRouter.delete('/:id', deleteGameController);

export default gameRouter;
