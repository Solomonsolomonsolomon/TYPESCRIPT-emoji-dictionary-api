


const router=require('express').Router();

const {home,oneemoji}=require('./../controller/home.controller');
router.get('/home',home)
router.get('/home/:emojiname',oneemoji)

module.exports=router;