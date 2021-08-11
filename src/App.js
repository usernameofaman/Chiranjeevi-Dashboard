import Home from './Components/Home/Home'
import Dashboard from './Components/Dashboard/Dash'
import AppBar from './Components/Home/AppBar'
import OPDForm from './Components/Forms/OPDForm'
import IPDForm from './Components/Forms/IPDForm'
import Patients from './Components/Dashboard/PatientList'


import { BrowserRouter, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <AppBar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/OPD" component={OPDForm} />
        <Route exact path="/IPD" component={IPDForm} />
        <Route exact path="/PatientsList" component={Patients} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
