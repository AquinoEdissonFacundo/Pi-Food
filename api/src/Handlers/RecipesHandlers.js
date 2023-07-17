const {  getRecipesById, getAllRecipes, getRecipesByName} = require("../controllers/RecipesControllers")
const { Recipe, TypeDiets, recipeTypeDiets } = require("../db")


const validate = (req, res, next) => {
    const { title, summary, healthScore, analyzedInstructions, TypeDiets, image} = req.body;
    if(!title || !summary || !healthScore || !analyzedInstructions || !TypeDiets || !image)
    res.status(400).json({error: "Datos Requeridos"});
next();
} 

const postRecipesHandler = async (req, res) => {
    try {
      const { title, summary, healthScore, analyzedInstructions, typeDiets, image } = req.body;
const exists = await Recipe.findAll({ where:{title:title}})
if(exists.length){
    throw new Error("ya existe una receta con este nombre")
} 
      const newRecipe = await Recipe.create({
        title,
        summary,
        healthScore,
        analyzedInstructions,
        image,
        created: true
      }); 
    
      newRecipe.addTypeDiets(typeDiets)

      res.status(200).json(newRecipe);

    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }} 
   

 const getRecipesByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await getRecipesById(id);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: "La receta solicitada no existe"})
    }
 };

 const getRecipesHandler = async (req, res) => {
 try {
    const { name } = req.query;
    const result = name ? await getRecipesByName(name) : await getAllRecipes();
    res.status(200).json(result)
    } 
 catch (error) {
    res.status(404).json({error: error.message})
    }
};


 module.exports = {
    validate,
    postRecipesHandler,
    getRecipesByIdHandler,
    getRecipesHandler
 }