import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromChefClaude, getRecipeFromMistral } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState(false);
  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const recipeSection = React.useRef(null);

  /**
     * Challenge:
     * Add a new effect that calls `recipeSection.current.scrollIntoView()`
     * only if recipe is not an empty string and recipeSection.current is not null.
     * Think carefully about what value(s) you would want to include in
     * the dependencies array.
  */

  React.useEffect(() => {
    if(recipe !== "") {
      recipeSection.current?.scrollIntoView();
    }
  }, [recipe])

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
  }

  async function generateRecipe() {
    setLoading(true);
    const ClaudeResponse = await getRecipeFromChefClaude(ingredients);
    setLoading(false);
    setRecipe(ClaudeResponse);
    setRecipeShown(true);
  }

  return (
    <div className="main-content">
      <form action={addIngredient}>
        <input
          name="ingredient"
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
        />
        <button className="add-ingredient-button" type="submit">
          + Add Ingredient
        </button>
      </form>
      <IngredientsList
        ref={recipeSection}
        ingredients={ingredients}
        generateRecipe={generateRecipe}
      />
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : undefined}
      {recipeShown ? (
        <section>
          <h2>Chef Claude Recommends:</h2>
          <ClaudeRecipe recipe={recipe} />
        </section>
      ) : undefined}
    </div>
  );
}
