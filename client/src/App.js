import "./App.css";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Registration from "./Components/Registration";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">element={<Home />}</Route>
          <Route path="/Login">element={<Login />}</Route>
          <Route path="/Registration">element={<Registration />}</Route>
        </Routes>
      </Router>
      <Home />
    </>
  );
}

export default App;
