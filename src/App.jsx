import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Series from './pages/Series';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Series} />
      </Switch>
    </Router>
  );
};

export default App;

