import {BrowserReact as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
