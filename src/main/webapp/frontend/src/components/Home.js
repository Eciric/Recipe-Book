import RecipeTile from './RecipeTile';
import pancakes from '../images/pancakes.jpg';
import brownies from '../images/brownies.jpg';
import cookies from '../images/cookies.jpg';
import opera from '../images/opera.jpg';
import croissants from '../images/croissants.jpg';
import lasagna from '../images/lasagna.jpg';
import lemoncustard from '../images/lemoncustard.jpg';
import pbchocolate from '../images/pbchocolate.jpg';
import pizza from '../images/pizza.jpg';
import poppyseedcake from '../images/poppyseedcake.jpg';
import shawarma from '../images/shawarma.jpg';
import walnutcake from '../images/walnutcake.jpg';

//Temporary for designing, will be fetched from api later
const recipes = [
    {
        id: 1,
        title: 'Pancakes',
        img: pancakes
    },
    {
        id: 2,
        title: 'Brownies',
        img: brownies
    },
    {
        id: 3,
        title: 'Chocolate Cookies',
        img: cookies
    },
    {
        id: 4,
        title: 'Opera Cake',
        img: opera
    },
    {
        id: 5,
        title: 'Croissants',
        img: croissants
    },
    {
        id: 6,
        title: 'Lasagna',
        img: lasagna
    },
    {
        id: 7,
        title: 'Lemon Custard Pie',
        img: lemoncustard
    },
    {
        id: 8,
        title: 'PB Chocolate Bars',
        img: pbchocolate
    },
    {
        id: 9,
        title: 'Pizza',
        img: pizza
    },
    {
        id: 10,
        title: 'Poppyseed Cake',
        img: poppyseedcake
    },
    {
        id: 11,
        title: 'Shawarma',
        img: shawarma
    },
    {
        id: 12,
        title: 'Walnut Cake',
        img: walnutcake
    }
]

const Home = () => {
    return (
        <div className='home'>
            <div className='searchBar'>
                <form className="form-inline my-5">
                    <input id='searchBar' className="form-control form-control-lg" type="search" placeholder="What are you looking for?" aria-label="Search"/>
                </form>
            </div>
            <section className='recipeList'>
                <div className='row justify-content-around'>
                {
                    recipes.map(recipe => {
                    return (
                        <RecipeTile title={recipe.title} img={recipe.img} key={recipe.id}/>
                        )
                    })
                }
                </div>
            </section>   
        </div>
    );
}

export default Home;