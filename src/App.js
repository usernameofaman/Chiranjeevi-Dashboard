import Home from './Components/Home/Home'
import Dashboard from './Components/Dashboard/Dash'
import AppBar from './Components/Home/AppBar'


import { BrowserRouter, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <AppBar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
