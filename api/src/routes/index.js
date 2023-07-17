const { Router } = require('express');
const recipesRouter = require('./recipesRouter');
const dietsRouter = require('./dietsRouter');
const mainRouter = Router();

mainRouter.use('/recipes', recipesRouter)
mainRouter.use('/types', dietsRouter)

module.exports = mainRouter;
