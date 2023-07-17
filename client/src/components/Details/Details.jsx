import React from "react";
import {getRecipesById, cleanDetail} from '../../Redux/actions';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import parser from 'html-react-parser'
export default function Detail (){
  const {id} = useParams()
  const dispatch = useDispatch() 
  useEffect(() => {
    dispatch(getRecipesById(id));

    return () => {
      dispatch(cleanDetail()); 
    };
  }, [id]);

 const detailsState = useSelector((state) => state.details)
console.log(detailsState);
  return (
      <div>
        <img src={detailsState.image} alt={detailsState.title} />
        <div>
          <h1>{detailsState.title}</h1>
          {/* <h2>id: {detailsState.id}</h2> */}
          
          <h2>DIETS: { !isNaN(+detailsState.id)?detailsState.TypeDiets.join(", ") : detailsState?.TypeDiets && detailsState.TypeDiets.map((d) => d.name).join(", ")}</h2>
  
        </div>
  
        <div >
          <div>
  
          <h3>{typeof detailsState.summary === 'string' ? parser(detailsState.summary) : null}</h3>
          </div><h3>STEPS:</h3>
          <ul>
            {!isNaN(+detailsState.id) && detailsState?.analyzedInstructions?.map((instruction) => (
              <li key={instruction.number}>
                {instruction.number}. {instruction.step}
              </li>
             ))}
          </ul>
  
          <h3>HEALTH SCORE: {detailsState.healthScore}</h3>
          </div>
          <Link to='/home'><button className="btn">Back to main Page </button> </Link>
    
  
      </div>
    );
}