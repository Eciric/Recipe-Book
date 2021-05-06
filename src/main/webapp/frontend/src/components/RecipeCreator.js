import {useEffect, useRef, useState} from 'react';

const validateName = (name) => {
    return (name.length > 2 && name.length < 15) 
}

const RecipeCreator = () => {
    const [recipeUri, setRecipeUri] = useState();
    const [name, setName] = useState();
    const [nameError, setNameError] = useState();
    const inputFile = useRef(null);
    const onButtonClick = () => {
       inputFile.current.click();
    };
    const onFileChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        setRecipeUri(URL.createObjectURL(file));
    };

    const handleNameChange = (e) => {
        setName(e.target.value)
        if (e.target.value) {
            setNameError('');
            e.target.style.border='1px solid #683ed1';
        }

        if (!validateName(e.target.value)) {
            setNameError('Username must be between 2 and 15 characters!');
            e.target.style.border='2px solid red';
        }

        if (!e.target.value) {
            setNameError('Username can\'t be empty!');
            e.target.style.border='2px solid red';
        }
    };
    return (
        <div className="recipeCreator container my-5">
            <div className="card-header py-2">
                <h1 className="display-4 text-center" style={{color:'#683ed1'}}>Recipe Creator!</h1>
            </div>
            
            <div className='recipeForm p-5'>

                <div className="form-group my-4">
                    <label className="my-1" for="comment">Recipe Name:</label>
                    <input id="recipeName" type="text" className="form-control" onChange={handleNameChange} value={name}></input>
                </div>
                
                <div className="form-group my-4">
                    <label>Recipe Image:</label>
                    <div className='recipePictureContainer'>
                        <img id="recipePicture" src={recipeUri} alt="" className="img-fluid my-4"/>
                        <div className="addRecipePictureContainer">
                            <span className="fa-stack">
                                <i id="recipeBackgroundIcon" className="fa fa-circle fa-stack-1x"></i>
                                <i id="addRecipePictureIcon" className="fa fa-plus-circle fa-stack-1x" onClick={onButtonClick}>
                                    <input type='file' id='file' ref={inputFile} onChange={onFileChange} style={{display: 'none'}}/>
                                </i>
                            </span>
                        </div>          
                    </div>
                </div>
                

                <div className="form-group my-4">
                    <label className="my-1" for="comment">Recipe Contents:</label>
                    <textarea id="recipeContent" className="form-control" rows="10"></textarea>
                </div>

                <div className="my-4">
                    <button type="button" className="btn btn-primary my-3">Submit your recipe!</button>
                </div>
            </div>
        </div>
    )
}

export default RecipeCreator;