import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import { RecipeView } from "./components/RecipeView";
import RecipeCreator from "./components/RecipeCreator";
import { getCurrentUser } from "./services/authService";

function App() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Router>
            <Navbar user={currentUser} />
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/profile/:username">
                        <Profile />
                    </Route>
                    <Route path="/recipecreator">
                        <RecipeCreator />
                    </Route>
                    <Route path="/recipeview/:id">
                        <RecipeView />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
