import './App.css';
import{BrowserRouter,Route,Switch} from 'react-router-dom' 
import LandingPage from './components/Landing/LandingPage'
import Home from './components/Home/Home';
import RecipeCreate from './components/Create/RecipeCreate';
import Details from './components/Details/Details';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route  path = '/home' component = {Home}/>
        <Route exact path ='/recipes/:id' component={Details}/>
        <Route exact path ='/recipe' component={RecipeCreate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
