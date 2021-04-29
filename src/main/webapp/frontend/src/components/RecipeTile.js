const RecipeTile = (props) => {
    return(
        <div className='recipeTile col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3'>
            <img className="img-fluid" src={props.img} alt=""></img>
            <h1 className='display-5'>{props.title}</h1>
        </div>
    ); 
}

export default RecipeTile;