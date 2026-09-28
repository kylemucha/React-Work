import React from "react"
export default function IngredientsList(props) {

  const ingredientsList = props.ingredients.map((ing) => <li key={ing}>{ing}</li>);

  return (
    <div>
      {props.ingredients.length > 0 ? (
        <div>
          <h2>Ingredients on Hand:</h2>
          <ul>{ingredientsList}</ul>
        </div>
      ) : undefined}
      {props.ingredients.length > 3 ? (
        <section className="generate-recipe-section">
          <div className="generate-recipe-text">
            <p className="generate-recipe-toptext">Ready for a recipe?</p>
            <p className="generate-recipe-bottomtext">
              Generate a recipe from your list of ingredients.
            </p>
          </div>
          <button
            onClick={props.generateRecipe}
            className="generate-recipe-button"
          >
            Get a recipe
          </button>
        </section>
      ) : undefined}
    </div>
  );
}
