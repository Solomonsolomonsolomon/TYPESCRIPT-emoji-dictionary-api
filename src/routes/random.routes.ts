


















import {Router} from 'express';
import {getRandomEmojis,random} from './../controller/random.controller'

const router=Router();

router.get('/random',random);
router.get('/random/:num',getRandomEmojis)
export default router