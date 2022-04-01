import './App.css';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import Adduser from './components/Adduser';
import EditUser from './components/EditUser';


function App() {
  return (
    <div className="App">
      <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/adduser' component={Adduser} />
    <Route exact path='/edituser/:id' component={EditUser} />
      </Switch>
    </div>
  );
}

export default App;
