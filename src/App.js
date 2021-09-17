import Home from './Components/Home/Home'
import Dashboard from './Components/Dashboard/Dash'
import AppBar from './Components/Home/AppBar'
import OPDForm from './Components/Dashboard/OPD'
import IPDForm from './Components/Forms/IPDForm'
import Patients from './Components/Dashboard/PatientList'
import UnderConstruction from './Components/UnderConstruction/UnderConstruction'
import Reports from './Components/Reports/Reports'
import Error from './Components/Error/Error'
import IPD from './Components/Dashboard/IPD'
import Doctors from './Components/Doctors/Doctors'
import Inventory from './Components/Inventory/Inventory'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


function App() {
  return (
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path="/" component={Home} />
    //     {/* <Route exact path="/Dashboard" component={Dashboard} />  */}
    //     <Route exact path="/Doctors" component={Doctors} /> 
    //     <Route exact path="/IPDForm" component={IPDForm} /> 
    //     <Route exact path="/OPD" component={OPDForm} />
    //     <Route exact path="/IPD" component={IPD} />
    //     <Route exact path="/PatientsList" component={Patients} />
    //     <Route exact path="/Inventory" component={Inventory} />
    //     <Route exact path="/NAN" component={UnderConstruction} />
    //     <Route exact path="/Reports" component={Reports} />
    //     <Route exact path="*" component={Error} />        

    //   </Switch>
    // </BrowserRouter>

    <BrowserRouter>
      <AppBar />
      <Switch>
        <PublicRoute restricted={true} component={Home} path="/" exact />
        <PrivateRoute component={Dashboard} path="/dashboard" exact />
        <PrivateRoute component={Doctors} path="/Doctors" exact />
        <PrivateRoute component={IPDForm} path="/IPDForm" exact />
        <PrivateRoute component={OPDForm} path="/OPD" exact />
        <PrivateRoute component={IPD} path="/IPD" exact />
        <PrivateRoute component={Patients} path="/PatientsList" exact />
        <PrivateRoute component={Inventory} path="/Inventory" exact />
        <PrivateRoute component={UnderConstruction} path="/NAN" exact />
        <PrivateRoute component={Reports} path="/Reports" exact />
        <PrivateRoute component={Error} path="*" exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
