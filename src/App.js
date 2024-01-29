import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Login from "./components/Login";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { getUserAuth } from "./actions";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
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
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
