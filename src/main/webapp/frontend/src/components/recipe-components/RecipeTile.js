import { useHistory } from "react-router-dom";

const RecipeTile = (props) => {
    const history = useHistory();

    const goToRecipeView = (id) => {
        history.push(`/recipeview/${id}`);
        window.location.reload();
    };
    return (
        <div
            onClick={() => goToRecipeView(props.id)}
            className="recipeTile col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3"
        >
            <img className="img-fluid" src={props.img} alt=""></img>
            <h1>{props.title}</h1>
        </div>
    );
};

export default RecipeTile;
