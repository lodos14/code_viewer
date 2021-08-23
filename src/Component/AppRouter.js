import { HashRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../Routes/LoginPage";
import Home from "../Routes/Home";

function AppRouter({ isLogined, users, codes }) {
  
  return (
    <Router>
      <Switch>
        {isLogined ? <Route exact path="/" ><Home users = {users} codes = {codes} /></Route>: <Route exact path="/" component={LoginPage} />}
      </Switch>
    </Router>
  );
}

export default AppRouter;
