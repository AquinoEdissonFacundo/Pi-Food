const axios= require('axios');
const{ Recipe, TypeDiets, recipeTypeDiets } = require('../db')
const { API_KEY } = process.env;
const { Op } = require("sequelize")

const URL = `hhttps://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;

const cleanArray = (arr) => {
return arr.map( (elem) =>{
  return {
      id: elem.id, 
      title: elem.title,
      image: elem.image,
      TypeDiets: elem.diets.map((d)=> {return{name:d}}),    
      summary: elem.summary,                             
      healthScore: elem.healthScore,                      
      analyzedInstructions: elem.analyzedInstructions,   
      created: false                                 
     }})
};
const cleanArrayDB = (arr) => { 
  return arr.map( (elem) =>{
    return {
        id: elem.id, 
        title: elem.title,
        image: elem.image,
        TypeDiets: elem.typeDiets?.map((d)=> {return{name:d}}),    
        summary: elem.summary,                             
        healthScore: elem.healthScore,                      
        analyzedInstructions: elem.analyzedInstructions,   
        created: false                                 
       }})
  };

const getRecipesById = async (id) => {
  if (isNaN(+id)) {
    const recetaId = await Recipe.findByPk(id, {include: [{model: TypeDiets, through:{attributes:[]}}]})
  return recetaId
  } else {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
      const recetaId = {
        id: response.data.id,
        title: response.data.title,
        image: response.data.image,
        summary: response.data.summary,
        healthScore: response.data.healthScore,
        analyzedInstructions: response.data.analyzedInstructions[0].steps,
        TypeDiets: response.data.diets,
        created: false   
      }
      return recetaId
    } catch (error) {
      return { error: `No existe la receta con ID: ${id}` };
    }
  }
};

const getRecipesByName = async (name) => {
  const DBRecipes = await Recipe.findAll({
    where: { title: { [Op.iLike]: `%${name}%` } },
    include: {
      model: TypeDiets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const apiRecipe = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?titleMatch=${name}&apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    )
  ).data;
  
  const newApi = cleanArray(apiRecipe.results);
console.log(newApi)
  const filteredApi = newApi.filter((recipe) => recipe.title && recipe.title.toLowerCase().includes(name.toLowerCase()));
  
  return [...DBRecipes, ...filteredApi];
};


const getAllRecipes = async () => {
  try {
    const DBRecipes = await Recipe.findAll({
      include: {
        model: TypeDiets,
        through: 'recipeTypeDiets',
      },
    });
console.log(DBRecipes);
    const DBRecipesWDiets = DBRecipes.map((recipe) => {
      const { TypeDiets, ...rest } = recipe.toJSON();
      return {
        ...rest,
        TypeDiets: TypeDiets.map((diet) => {return{name: diet.name}}),
      };
    });
console.log(DBRecipesWDiets);
    const APIRecipes = await axios.get(URL);
    const cleanedAPIRecipes = cleanArray(APIRecipes.data.results);

    return [...DBRecipesWDiets, ...cleanedAPIRecipes];
  } catch (error) {
    console.error('Error al obtener las recetas:', error);
    throw error;
  }
};



module.exports= {
  getRecipesById,
  getRecipesByName,
  getAllRecipes,
 
}