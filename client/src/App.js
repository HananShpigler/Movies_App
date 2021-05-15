import Header from "./components/Header/Header";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";

import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>

      <BottomNavigation />
    </BrowserRouter>
  );
}

export default App;
