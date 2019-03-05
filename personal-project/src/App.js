import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import SearchSideBar from './Components/SearchSideBar/SearchSideBar';
import routes from "./routes"
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';

class App extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="App">
        <Header/>
        {routes}
        
      </div>
    );
  }
}

export default App;
