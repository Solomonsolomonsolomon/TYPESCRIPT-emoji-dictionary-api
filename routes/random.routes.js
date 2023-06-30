



const router=require('express').Router();

const {random,randomNumber}=require('./../controller/random.controller')
router.get('/random',random)
router.get('/random/:number',randomNumber)
module.exports=router;