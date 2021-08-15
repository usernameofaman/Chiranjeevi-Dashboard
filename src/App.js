import Home from './Components/Home/Home'
import Dashboard from './Components/Dashboard/Dash'
import AppBar from './Components/Home/AppBar'
import OPDForm from './Components/Forms/OPDForm'
import IPDForm from './Components/Forms/IPDForm'
import Patients from './Components/Dashboard/PatientList'
import UnderConstruction from './Components/UnderConstruction/UnderConstruction'
import Error from './Components/Error/Error'
import IPD from './Components/Dashboard/IPD'
import Doctors from './Components/Doctors/Doctors'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <AppBar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Dashboard" component={Dashboard} /> 
        <Route exact path="/Doctors" component={Doctors} /> 
        <Route exact path="/IPDForm" component={IPDForm} /> 
        <Route exact path="/OPD" component={OPDForm} />
        <Route exact path="/IPD" component={IPD} />
        <Route exact path="/PatientsList" component={Patients} />
        <Route exact path="/NAN" component={UnderConstruction} />
        <Route exact path="*" component={Error} />        

      </Switch>
    </BrowserRouter>
  );
}

export default App;
