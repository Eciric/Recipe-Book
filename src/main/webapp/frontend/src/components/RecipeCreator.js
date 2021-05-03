const RecipeCreator = () => {
    return (
        <div className="recipeCreator container my-5">
            <div className="card-header py-2">
                <h1 className="display-4 text-center" style={{color:'#683ed1'}}>Recipe Creator!</h1>
            </div>
            
            <div className='recipeForm p-5'>
                <div className="form-group my-4">
                    <label className="my-1" for="comment">Recipe Name:</label>
                    <input id="recipeName" type="text" className="form-control"></input>
                </div>

                <div className="form-group my-4">
                    <label className="my-1" for="comment">Recipe Contents:</label>
                    <textarea id="recipeContent" className="form-control" rows="5"></textarea>
                </div>
            </div>
        </div>
    )
}

export default RecipeCreator;