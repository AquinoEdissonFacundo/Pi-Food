const { Router } = require('express');
const { getDietsHandler } = require("../Handlers/DietsHandlers")
const dietsRouter = Router();

dietsRouter.get("/", getDietsHandler) 


module.exports = dietsRouter
