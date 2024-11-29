import {Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import ApplicationForm from './components/ApplicationForm';
import ApplicationDetails from './components/ApplicationDetails';
import './App.css';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/new-application" component={ApplicationForm} />
      <Route exact path={`/application-details/:id`} component={ApplicationDetails} />
    </Switch>
  )
}

export default App;
