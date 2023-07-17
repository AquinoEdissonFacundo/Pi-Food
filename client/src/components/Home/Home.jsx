import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  filterRecipesByTypeDiet,
  orderByName,
  orderBySource,
  orderByPuntuation,
  getRecipesByName,
  handleNumber,
  getTypeDiets,
  prevPage,
  nextPage,
} from "../../Redux/actions";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const {
    allRecipes,
    recipes,
    typeDiets,
    numPage,
  } = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [typeDietFilter, setTypeDietFilter] = useState("All");

  const recipesPerPage = 9;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const start = (numPage - 1) * recipesPerPage;
  const end = start + recipesPerPage;

  let viewRecipes = [];

  if (Array.isArray(recipes) && recipes.length > 0) {
    viewRecipes = recipes.slice(start, end);
  } else {
    viewRecipes = [];
  }

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getTypeDiets());
  }, [dispatch]);

  const handleFilterTypeDiet = (e) => {
    setTypeDietFilter(e.target.value);
    dispatch(filterRecipesByTypeDiet(e.target.value));
    dispatch(handleNumber(1));
  };

  const handleOrderByName = (e) => {
    setOrder(e.target.value);
    dispatch(orderByName(e.target.value));
    dispatch(handleNumber(1));
  };

  const handlePuntuation = (e) => {
    setOrder(e.target.value);
    dispatch(orderByPuntuation(e.target.value));
    dispatch(handleNumber(1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipesByName(search));
    setSearch("");
  };

  const handleInputName = (e) => {
    setSearch(e.target.value);
  };

  const handleFromApi = (e) => {
    dispatch(orderBySource(e.target.value));
    dispatch(handleNumber(1));
  };

  return (
    <div className={styles.bkg}>
      <div id={styles.navBar}>
        <div className={styles.search}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="¿Qué quieres buscar?"
              value={search}
              onChange={handleInputName}
              className={styles.input}
            />
            <button type="submit" className={styles.btnsearch}>
              Buscar
            </button>
          </form>
        </div>

        <div className={styles.filterC}>
          <Link to="/recipe">
            <button className={styles.create}>Crear Receta</button>
          </Link>

          <div className={styles.filt}>
            <select onChange={handleOrderByName} value={order} className={styles.select}>
              <option value="asc">A-Z</option>
              <option value="des">Z-A</option>
            </select>
          </div>

          <div>
            <select className={styles.select} onChange={handleFromApi}>
              <option value="ALL">ALL RECIPES</option>
              <option value="API">FROM API</option>
              <option value="BDD">FROM DATABASE</option>
            </select>
          </div>

          <div>
            <select onChange={handlePuntuation} value={order} className={styles.select}>
              <option value="mayormenor">mayor a menor health score</option>
              <option value="menormayor">menor a mayor health score</option>
            </select>
          </div>

          <div>
            <select onChange={handleFilterTypeDiet} value={typeDietFilter} className={styles.select}>
              <option value="All">Todas las recetas</option>
              {typeDiets.map((typeDiet) => (
                <option key={typeDiet.name} value={typeDiet.name}>
                  {typeDiet.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Paginate cantPages={totalPages} numPage={numPage} />

      {viewRecipes.length > 0 ? (
        <div className={styles.cards}>
          {viewRecipes.map((recipe) => (
            <Link to={"/recipes/" + recipe.id} key={recipe.id}>
              <Card title={recipe.title} image={recipe.image} TypeDiets={recipe.TypeDiets} />
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.noRecipes}>
         <h1> No hay recetas disponibles.</h1>
         </div>
      )}
    </div>
  );
}
