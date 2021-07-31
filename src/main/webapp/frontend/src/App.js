import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./services/auth-services/authService";
import Navbar from "./components/layout-components/Navbar";
import Home from "./components/layout-components/Home";
import Footer from "./components/layout-components/Footer";
import Login from "./components/user-components/Login";
import Register from "./components/user-components/Register";
import Profile from "./components/user-components/Profile";
import { RecipeView } from "./components/recipe-components/RecipeView";
import RecipeCreator from "./components/recipe-components/RecipeCreator";
import { AdminPanel } from "./components/admin-components/AdminPanel";

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
                    <Route path="/adminpanel">
                        <AdminPanel />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
