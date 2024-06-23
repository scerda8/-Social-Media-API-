const router=require('express').Router();
const UserRoutes=require("./UserRoutes");
const ThoughtRoutes=require('./ThoughtsRoutes');

router.use('/thoughts',ThoughtRoutes);
router.use('/users',UserRoutes);

module.exports=router;