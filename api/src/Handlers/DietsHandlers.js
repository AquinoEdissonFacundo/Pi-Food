const { TypeDiets } = require("../db");
const { getApiDiets } = require("../controllers/DietsControllers");

const getDietsHandler = async (req, res) => {
  try {
    const diets = await TypeDiets.findAll();
    if (diets.length === 0) {
      await getApiDiets();
    }
    const dbDiets = await TypeDiets.findAll();
    res.status(200).json(dbDiets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDietsHandler,
};

