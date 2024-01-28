import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Fragment } from "react";
import Login from "./components/Login";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
// import Protected from "./components/Protected";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          {/* <Route path="/" element={<Protected />}> */}
          <Route
            path="/home"
            index
            element={
              <React.Fragment>
                <Header />
                <Home />
              </React.Fragment>
            }
          />
          {/* </Route> */}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
