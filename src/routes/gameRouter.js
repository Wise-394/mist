import { Router } from 'express';
import multer from 'multer';
import {
  deleteGameController,
  getGameController,
  postGameController,
} from '../controller/gameController.js';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get('/:id', getGameController);
router.post('/:id', upload.single('image'), postGameController);
router.delete('/:id', deleteGameController);

export default router;
