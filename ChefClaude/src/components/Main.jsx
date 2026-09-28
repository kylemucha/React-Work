import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromChefClaude, getRecipeFromMistral } from "./ai"

export default function Main() {

  const [ingredients, setIngredients] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState(false);
  const [recipe, setRecipe] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
  }

  async function generateRecipe() {
    setLoading(true)
    const ClaudeResponse = await getRecipeFromChefClaude(ingredients)
    setLoading(false)
    setRecipe(ClaudeResponse)
    setRecipeShown(true)
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
      <IngredientsList ingredients={ingredients} generateRecipe={generateRecipe} />
      {loading ? <div className="spinner-container"><div className="spinner"></div></div> : undefined}
      {recipeShown ? (
        <section>
          <h2>Chef Claude Recommends:</h2>
          <ClaudeRecipe recipe={recipe}/>
        </section>
      ) : undefined}
    </div>
  );
}
